import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ 
  apiKey,
  dangerouslyAllowBrowser: true
}) : null;

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'data_analysis' | 'report_generation' | 'notification' | 'email' | 'api_call' | 'condition' | 'delay';
  config: any;
  enabled: boolean;
  order: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'schedule' | 'event' | 'manual';
    config: any;
  };
  steps: WorkflowStep[];
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
  status: 'active' | 'paused' | 'error';
}

export interface Task {
  id: string;
  workflowId: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: Date;
  createdAt: Date;
  completedAt?: Date;
  dependencies: string[];
  tags: string[];
}

export interface ApprovalRequest {
  id: string;
  title: string;
  description: string;
  requestor: string;
  approvers: string[];
  requiredApprovals: number;
  currentApprovals: Array<{
    approver: string;
    status: 'approved' | 'rejected' | 'pending';
    comment?: string;
    timestamp: Date;
  }>;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
  data: any;
}

export class WorkflowAutomationEngine {
  private workflows: Workflow[] = [
    {
      id: 'weekly-report',
      name: 'Weekly Performance Report',
      description: 'Generate and send weekly performance reports every Monday',
      trigger: {
        type: 'schedule',
        config: { frequency: 'weekly', day: 'monday', time: '09:00' }
      },
      steps: [
        {
          id: '1',
          name: 'Collect Dashboard Data',
          type: 'data_analysis',
          config: { source: 'dashboard' },
          enabled: true,
          order: 1
        },
        {
          id: '2',
          name: 'Generate Report',
          type: 'report_generation',
          config: { template: 'weekly-executive', format: 'pdf' },
          enabled: true,
          order: 2
        },
        {
          id: '3',
          name: 'Send Email',
          type: 'email',
          config: { 
            recipients: ['manager@company.com'], 
            subject: 'Weekly Performance Report',
            template: 'report-email'
          },
          enabled: true,
          order: 3
        }
      ],
      enabled: true,
      status: 'active'
    }
  ];

  private tasks: Task[] = [];
  private approvalRequests: ApprovalRequest[] = [];

  async createWorkflow(workflow: Omit<Workflow, 'id' | 'status'>): Promise<Workflow> {
    const newWorkflow: Workflow = {
      id: `workflow_${Date.now()}`,
      status: 'active',
      ...workflow
    };
    
    this.workflows.push(newWorkflow);
    
    // Schedule the workflow if it's time-based
    if (newWorkflow.trigger.type === 'schedule') {
      this.scheduleWorkflow(newWorkflow);
    }
    
    return newWorkflow;
  }

  async executeWorkflow(workflowId: string, context: any = {}): Promise<void> {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (!workflow || !workflow.enabled) {
      throw new Error(`Workflow ${workflowId} not found or disabled`);
    }

    workflow.lastRun = new Date();
    let executionContext = { ...context };

    try {
      // Execute steps in order
      for (const step of workflow.steps.sort((a, b) => a.order - b.order)) {
        if (!step.enabled) continue;
        
        executionContext = await this.executeStep(step, executionContext);
      }
      
      workflow.status = 'active';
    } catch (error) {
      console.error(`Workflow execution error:`, error);
      workflow.status = 'error';
    }
  }

  private async executeStep(step: WorkflowStep, context: any): Promise<any> {
    switch (step.type) {
      case 'data_analysis':
        return this.executeDataAnalysis(step, context);
      case 'report_generation':
        return this.executeReportGeneration(step, context);
      case 'notification':
        return this.executeNotification(step, context);
      case 'email':
        return this.executeEmail(step, context);
      case 'condition':
        return this.executeCondition(step, context);
      case 'delay':
        return this.executeDelay(step, context);
      default:
        console.warn(`Unknown step type: ${step.type}`);
        return context;
    }
  }

  private async executeDataAnalysis(step: WorkflowStep, context: any): Promise<any> {
    // Simulate data collection and analysis
    const analysisResult = {
      timestamp: new Date(),
      data: context.dashboardData || {},
      insights: await this.generateInsights(context.dashboardData)
    };
    
    return { ...context, analysisResult };
  }

  private async executeReportGeneration(step: WorkflowStep, context: any): Promise<any> {
    // Generate report using the report generator
    const reportResult = {
      reportId: `report_${Date.now()}`,
      template: step.config.template,
      format: step.config.format,
      generatedAt: new Date()
    };
    
    return { ...context, reportResult };
  }

  private async executeNotification(step: WorkflowStep, context: any): Promise<any> {
    // Send notification
    console.log(`Sending notification: ${step.config.message}`);
    return context;
  }

  private async executeEmail(step: WorkflowStep, context: any): Promise<any> {
    // Send email (in real implementation, integrate with email service)
    console.log(`Sending email to ${step.config.recipients.join(', ')}`);
    return context;
  }

  private async executeCondition(step: WorkflowStep, context: any): Promise<any> {
    // Evaluate condition and potentially skip next steps
    const condition = step.config.condition;
    const result = this.evaluateCondition(condition, context);
    
    return { ...context, conditionResult: result };
  }

  private async executeDelay(step: WorkflowStep, context: any): Promise<any> {
    // Add delay (in real implementation, this would be handled by the scheduler)
    await new Promise(resolve => setTimeout(resolve, step.config.duration || 1000));
    return context;
  }

  private async generateInsights(data: any): Promise<string[]> {
    if (!openai) {
      return [
        'Workflow automation system is active and ready',
        'Task management and scheduling capabilities configured',
        'AI-powered insights available once OpenAI is configured'
      ];
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Generate key business insights from dashboard data for workflow automation."
          },
          {
            role: "user",
            content: `Analyze this data and provide 3-5 key insights: ${JSON.stringify(data)}`
          }
        ],
        max_tokens: 500
      });

      const insights = response.choices[0].message.content?.split('\n').filter(line => line.trim()) || [];
      return insights;
    } catch (error) {
      console.error('Insight generation error:', error);
      return ['Unable to generate insights at this time.'];
    }
  }

  private evaluateCondition(condition: string, context: any): boolean {
    // Simple condition evaluation (in real implementation, use a proper expression evaluator)
    try {
      // Example: "revenue > 1000"
      return eval(condition.replace(/\w+/g, (match) => `context.${match}` || '0'));
    } catch {
      return false;
    }
  }

  private scheduleWorkflow(workflow: Workflow): void {
    // In a real implementation, integrate with a job scheduler like node-cron
    console.log(`Scheduled workflow: ${workflow.name}`);
    
    // Calculate next run time based on trigger config
    const now = new Date();
    const config = workflow.trigger.config;
    
    if (config.frequency === 'daily') {
      workflow.nextRun = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else if (config.frequency === 'weekly') {
      workflow.nextRun = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }

  // Task Management
  createTask(task: Omit<Task, 'id' | 'createdAt' | 'status'>): Task {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      createdAt: new Date(),
      status: 'pending',
      ...task
    };
    
    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(taskId: string, status: Task['status'], completedBy?: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      if (status === 'completed') {
        task.completedAt = new Date();
      }
    }
  }

  getOverdueTasks(): Task[] {
    const now = new Date();
    return this.tasks.filter(task => 
      task.status !== 'completed' && 
      task.dueDate < now
    ).map(task => ({ ...task, status: 'overdue' as const }));
  }

  // Approval System
  createApprovalRequest(request: Omit<ApprovalRequest, 'id' | 'status' | 'currentApprovals'>): ApprovalRequest {
    const newRequest: ApprovalRequest = {
      id: `approval_${Date.now()}`,
      status: 'pending',
      currentApprovals: request.approvers.map(approver => ({
        approver,
        status: 'pending' as const,
        timestamp: new Date()
      })),
      ...request
    };
    
    this.approvalRequests.push(newRequest);
    return newRequest;
  }

  processApproval(requestId: string, approver: string, decision: 'approved' | 'rejected', comment?: string): void {
    const request = this.approvalRequests.find(r => r.id === requestId);
    if (!request) return;

    const approval = request.currentApprovals.find(a => a.approver === approver);
    if (approval) {
      approval.status = decision;
      approval.comment = comment;
      approval.timestamp = new Date();
    }

    // Check if request is now approved or rejected
    const approvedCount = request.currentApprovals.filter(a => a.status === 'approved').length;
    const rejectedCount = request.currentApprovals.filter(a => a.status === 'rejected').length;

    if (rejectedCount > 0) {
      request.status = 'rejected';
    } else if (approvedCount >= request.requiredApprovals) {
      request.status = 'approved';
    }
  }

  // Getters
  getWorkflows(): Workflow[] {
    return [...this.workflows];
  }

  getTasks(status?: Task['status']): Task[] {
    return status ? this.tasks.filter(t => t.status === status) : [...this.tasks];
  }

  getApprovalRequests(status?: ApprovalRequest['status']): ApprovalRequest[] {
    return status ? this.approvalRequests.filter(r => r.status === status) : [...this.approvalRequests];
  }

  getWorkflowById(id: string): Workflow | undefined {
    return this.workflows.find(w => w.id === id);
  }

  // Workflow Management
  pauseWorkflow(workflowId: string): void {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (workflow) {
      workflow.status = 'paused';
    }
  }

  resumeWorkflow(workflowId: string): void {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (workflow) {
      workflow.status = 'active';
      if (workflow.trigger.type === 'schedule') {
        this.scheduleWorkflow(workflow);
      }
    }
  }

  deleteWorkflow(workflowId: string): void {
    this.workflows = this.workflows.filter(w => w.id !== workflowId);
  }
}

export const workflowEngine = new WorkflowAutomationEngine();