import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ 
  apiKey,
  dangerouslyAllowBrowser: true
}) : null;

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'percentage_change';
  threshold: number;
  enabled: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  channels: ('email' | 'push' | 'sms' | 'inApp')[];
  description: string;
}

export interface SmartNotification {
  id: string;
  type: 'proactive_alert' | 'kpi_warning' | 'trend_alert' | 'anomaly_detected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  actionRequired: boolean;
  suggestedActions: string[];
  data: any;
  timestamp: Date;
  acknowledged: boolean;
}

export class SmartNotificationManager {
  private alertRules: AlertRule[] = [
    {
      id: '1',
      name: 'Revenue Drop Alert',
      metric: 'daily_revenue',
      condition: 'less_than',
      threshold: 1000,
      enabled: true,
      priority: 'high',
      channels: ['email', 'push', 'inApp'],
      description: 'Alert when daily revenue drops below threshold'
    },
    {
      id: '2',
      name: 'High Error Rate',
      metric: 'error_rate',
      condition: 'greater_than',
      threshold: 5,
      enabled: true,
      priority: 'critical',
      channels: ['email', 'push', 'sms', 'inApp'],
      description: 'Alert when error rate exceeds 5%'
    },
    {
      id: '3',
      name: 'User Activity Drop',
      metric: 'active_users',
      condition: 'percentage_change',
      threshold: -20,
      enabled: true,
      priority: 'medium',
      channels: ['email', 'inApp'],
      description: 'Alert when user activity drops by 20%'
    }
  ];

  async generateProactiveAlert(dashboardData: any): Promise<SmartNotification[]> {
    if (!openai) {
      // DEMO MODE: Generate intelligent alerts based on actual dashboard data
      return this.generateMockAlerts(dashboardData);
    }
    
    try {
      const prompt = `
Analyze this dashboard data and generate proactive alerts for potential issues:

${JSON.stringify(dashboardData, null, 2)}

Look for:
- Declining KPIs that need immediate attention
- Unusual patterns that could indicate problems
- Opportunities that shouldn't be missed
- Performance issues that need addressing

Return a JSON array of alerts with this structure:
{
  "type": "proactive_alert",
  "priority": "high",
  "title": "KPI Alert Title",
  "message": "Detailed alert message",
  "actionRequired": true,
  "suggestedActions": ["Action 1", "Action 2"],
  "data": {}
}

Only return alerts that are genuinely important and actionable.
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an intelligent business monitoring system. Generate only critical, actionable alerts that require immediate attention."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      });

      const result = JSON.parse(response.choices[0].message.content || '{"alerts": []}');
      return (result.alerts || []).map((alert: any, index: number) => ({
        id: `alert_${Date.now()}_${index}`,
        timestamp: new Date(),
        acknowledged: false,
        ...alert
      }));
    } catch (error) {
      console.error('Proactive alert generation error:', error);
      return [];
    }
  }

  async prioritizeNotifications(notifications: any[]): Promise<any[]> {
    if (!openai) {
      // DEMO MODE: Smart prioritization without API
      return this.mockPrioritizeNotifications(notifications);
    }
    
    try {
      const prompt = `
Analyze these notifications and determine their priority order based on business impact:

${JSON.stringify(notifications, null, 2)}

Consider:
- Business impact (revenue, users, operations)
- Urgency (time-sensitive issues)
- Severity (critical vs minor issues)
- Opportunity cost

Return the notifications in order of priority (most important first) with updated priority levels.
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert in business priority management. Rank notifications by their actual business impact and urgency."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      });

      const result = JSON.parse(response.choices[0].message.content || '{"prioritized": []}');
      return result.prioritized || notifications;
    } catch (error) {
      console.error('Notification prioritization error:', error);
      return notifications;
    }
  }

  checkAlertRules(dashboardData: any): SmartNotification[] {
    const triggeredAlerts: SmartNotification[] = [];

    this.alertRules.forEach(rule => {
      if (!rule.enabled) return;

      const metricValue = this.extractMetricValue(dashboardData, rule.metric);
      if (metricValue === null) return;

      let triggered = false;
      switch (rule.condition) {
        case 'greater_than':
          triggered = metricValue > rule.threshold;
          break;
        case 'less_than':
          triggered = metricValue < rule.threshold;
          break;
        case 'equals':
          triggered = metricValue === rule.threshold;
          break;
        case 'percentage_change':
          // This would need historical data comparison
          break;
      }

      if (triggered) {
        triggeredAlerts.push({
          id: `rule_${rule.id}_${Date.now()}`,
          type: 'kpi_warning',
          priority: rule.priority,
          title: `${rule.name} Triggered`,
          message: `${rule.description}: Current value is ${metricValue}`,
          actionRequired: rule.priority === 'high' || rule.priority === 'critical',
          suggestedActions: this.getSuggestedActions(rule),
          data: { rule, currentValue: metricValue },
          timestamp: new Date(),
          acknowledged: false
        });
      }
    });

    return triggeredAlerts;
  }

  private extractMetricValue(dashboardData: any, metric: string): number | null {
    // Extract metric values from dashboard data
    switch (metric) {
      case 'daily_revenue':
        const revenueStr = dashboardData.stats?.find((s: any) => s.id === 'revenue')?.value;
        return this.parseNumericValue(revenueStr);
      case 'active_users':
        const usersStr = dashboardData.stats?.find((s: any) => s.id === 'users')?.value;
        return this.parseNumericValue(usersStr);
      case 'error_rate':
        // This would come from system metrics
        return Math.random() * 10; // Mock for demo
      default:
        return null;
    }
  }

  private parseNumericValue(value: string): number | null {
    if (!value) return null;
    const numStr = value.replace(/[^\d.]/g, '');
    const num = parseFloat(numStr);
    return isNaN(num) ? null : num;
  }

  private getSuggestedActions(rule: AlertRule): string[] {
    switch (rule.metric) {
      case 'daily_revenue':
        return [
          'Check payment gateway status',
          'Review marketing campaigns',
          'Analyze customer feedback',
          'Contact top customers'
        ];
      case 'active_users':
        return [
          'Check system performance',
          'Review recent changes',
          'Send re-engagement campaigns',
          'Analyze user feedback'
        ];
      case 'error_rate':
        return [
          'Check server logs',
          'Review recent deployments',
          'Monitor system resources',
          'Alert development team'
        ];
      default:
        return ['Investigate the issue', 'Review related metrics', 'Take corrective action'];
    }
  }

  getAlertRules(): AlertRule[] {
    return [...this.alertRules];
  }

  updateAlertRule(ruleId: string, updates: Partial<AlertRule>): void {
    const index = this.alertRules.findIndex(rule => rule.id === ruleId);
    if (index !== -1) {
      this.alertRules[index] = { ...this.alertRules[index], ...updates };
    }
  }

  addAlertRule(rule: Omit<AlertRule, 'id'>): void {
    const newRule: AlertRule = {
      id: `rule_${Date.now()}`,
      ...rule
    };
    this.alertRules.push(newRule);
  }

  deleteAlertRule(ruleId: string): void {
    this.alertRules = this.alertRules.filter(rule => rule.id !== ruleId);
  }

  private generateMockAlerts(dashboardData: any): SmartNotification[] {
    const alerts: SmartNotification[] = [];
    
    // Analyze real dashboard data for intelligent mock alerts
    if (dashboardData.stats) {
      const revenueData = dashboardData.stats.find((s: any) => s.id === 'revenue');
      const usersData = dashboardData.stats.find((s: any) => s.id === 'users');
      const conversionData = dashboardData.stats.find((s: any) => s.id === 'conversion');
      
      // Revenue-based alerts
      if (revenueData) {
        const revenueValue = parseFloat(revenueData.value.replace(/[^0-9.]/g, ''));
        const revenueGrowth = parseFloat(revenueData.change.replace(/[^0-9.-]/g, ''));
        
        if (revenueGrowth > 10) {
          alerts.push({
            id: `revenue_growth_${Date.now()}`,
            type: 'trend_alert',
            priority: 'medium',
            title: '🚀 Exceptional Revenue Growth Detected',
            message: `Your revenue is up ${revenueData.change}! This is an excellent opportunity to scale your successful strategies.`,
            actionRequired: true,
            suggestedActions: [
              'Analyze top-performing revenue sources',
              'Increase investment in successful channels',
              'Prepare infrastructure for continued growth'
            ],
            data: { currentRevenue: revenueData.value, growth: revenueData.change },
            timestamp: new Date(),
            acknowledged: false
          });
        }
        
        if (revenueValue > 45000) {
          alerts.push({
            id: `revenue_milestone_${Date.now()}`,
            type: 'proactive_alert',
            priority: 'high',
            title: '🎯 Revenue Milestone Achievement',
            message: `Congratulations! You've reached ${revenueData.value} in revenue. Consider expanding your market reach.`,
            actionRequired: true,
            suggestedActions: [
              'Explore new market segments',
              'Consider premium product offerings',
              'Plan for international expansion'
            ],
            data: { milestone: revenueData.value, nextTarget: '$50,000' },
            timestamp: new Date(),
            acknowledged: false
          });
        }
      }
      
      // User engagement alerts
      if (usersData && conversionData) {
        const conversionRate = parseFloat(conversionData.value.replace(/[^0-9.]/g, ''));
        
        if (conversionRate < 3.5) {
          alerts.push({
            id: `conversion_optimization_${Date.now()}`,
            type: 'kpi_warning',
            priority: 'high',
            title: '⚡ Conversion Rate Optimization Opportunity',
            message: `Current conversion rate is ${conversionData.value}. Industry average is 4.2%. Optimizing could significantly boost revenue.`,
            actionRequired: true,
            suggestedActions: [
              'A/B test landing page designs',
              'Improve user onboarding flow',
              'Analyze user journey bottlenecks',
              'Implement exit-intent popups'
            ],
            data: { currentRate: conversionData.value, industryAverage: '4.2%', potentialIncrease: '15-25%' },
            timestamp: new Date(),
            acknowledged: false
          });
        }
      }
      
      // Transaction-based alerts
      if (dashboardData.transactions) {
        const completedTransactions = dashboardData.transactions.filter((t: any) => t.status === 'completed').length;
        const totalTransactions = dashboardData.transactions.length;
        const successRate = (completedTransactions / totalTransactions) * 100;
        
        if (successRate < 90) {
          alerts.push({
            id: `transaction_success_${Date.now()}`,
            type: 'anomaly_detected',
            priority: 'critical',
            title: '🚨 Transaction Success Rate Alert',
            message: `Transaction success rate is ${successRate.toFixed(1)}%. This requires immediate attention to prevent revenue loss.`,
            actionRequired: true,
            suggestedActions: [
              'Check payment gateway status',
              'Review failed transaction logs',
              'Contact payment processor support',
              'Implement backup payment methods'
            ],
            data: { successRate: `${successRate.toFixed(1)}%`, failedCount: totalTransactions - completedTransactions },
            timestamp: new Date(),
            acknowledged: false
          });
        }
      }
    }
    
    // If no specific alerts, provide general optimization suggestions
    if (alerts.length === 0) {
      alerts.push({
        id: `optimization_suggestion_${Date.now()}`,
        type: 'proactive_alert',
        priority: 'medium',
        title: '📊 Performance Optimization Opportunities',
        message: 'Your dashboard data shows stable performance. Here are proactive optimization strategies to boost growth.',
        actionRequired: false,
        suggestedActions: [
          'Conduct user experience audit',
          'Implement advanced analytics tracking',
          'Set up automated performance monitoring',
          'Plan A/B tests for key conversion points'
        ],
        data: { type: 'proactive_optimization', confidence: 0.8 },
        timestamp: new Date(),
        acknowledged: false
      });
    }
    
    return alerts;
  }

  private mockPrioritizeNotifications(notifications: any[]): any[] {
    // Smart prioritization logic based on business impact
    const priorityOrder = {
      'critical': 4,
      'high': 3,
      'medium': 2,
      'low': 1
    };
    
    const typeImpact = {
      'anomaly_detected': 4,
      'kpi_warning': 3,
      'proactive_alert': 2,
      'trend_alert': 1
    };
    
    return notifications.sort((a, b) => {
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
      const aTypeImpact = typeImpact[a.type as keyof typeof typeImpact] || 1;
      const bTypeImpact = typeImpact[b.type as keyof typeof typeImpact] || 1;
      
      // First sort by priority, then by type impact, then by timestamp
      if (aPriority !== bPriority) return bPriority - aPriority;
      if (aTypeImpact !== bTypeImpact) return bTypeImpact - aTypeImpact;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }
}

export const smartNotificationManager = new SmartNotificationManager();