import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ 
  apiKey,
  dangerouslyAllowBrowser: true
}) : null;

export interface UserBehaviorAnalysis {
  userId: string;
  userName: string;
  loginFrequency: number;
  averageSessionDuration: number;
  mostActiveHours: string[];
  featuresUsed: string[];
  performanceScore: number;
  activityTrend: 'increasing' | 'decreasing' | 'stable';
  lastActive: Date;
  recommendations: string[];
}

export interface TeamPerformance {
  teamId: string;
  teamName: string;
  members: UserBehaviorAnalysis[];
  overallScore: number;
  productivity: number;
  collaboration: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface TrainingRecommendation {
  userId: string;
  skillGaps: string[];
  recommendedCourses: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    estimatedDuration: string;
    provider: string;
  }>;
  learningPath: string[];
  timeline: string;
}

export class PersonnelManagementAssistant {
  async analyzeUserBehavior(userData: any): Promise<UserBehaviorAnalysis[]> {
    if (!openai) {
      // DEMO MODE: Generate intelligent user behavior analysis
      return this.generateMockUserBehavior();
    }
    
    try {
      const prompt = `
Analyze this user activity data and provide comprehensive behavior insights:

USER DATA:
${JSON.stringify(userData, null, 2)}

For each user, analyze:
- Login patterns and frequency
- Feature usage and preferences
- Performance indicators
- Activity trends
- Areas for improvement

Return a JSON array of user analyses with this structure:
{
  "userId": "user_id",
  "userName": "User Name",
  "loginFrequency": 25,
  "averageSessionDuration": 45,
  "mostActiveHours": ["09:00-12:00", "14:00-17:00"],
  "featuresUsed": ["dashboard", "reports", "analytics"],
  "performanceScore": 8.5,
  "activityTrend": "increasing",
  "lastActive": "2024-01-15",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert HR analytics specialist. Analyze user behavior data to provide insights for personnel management and performance optimization."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || '{"users": []}');
      return result.users || [];
    } catch (error) {
      console.error('User behavior analysis error:', error);
      return [];
    }
  }

  async evaluateTeamPerformance(teamData: any): Promise<TeamPerformance[]> {
    if (!openai) {
      // DEMO MODE: Generate team performance analysis
      return this.generateMockTeamPerformance();
    }
    
    try {
      const prompt = `
Analyze team performance data and provide comprehensive team insights:

TEAM DATA:
${JSON.stringify(teamData, null, 2)}

For each team, evaluate:
- Overall team performance metrics
- Individual member contributions
- Team collaboration effectiveness
- Productivity indicators
- Strengths and areas for improvement

Return a JSON array of team analyses with this structure:
{
  "teamId": "team_id",
  "teamName": "Team Name",
  "members": [], // User behavior analyses
  "overallScore": 8.2,
  "productivity": 7.8,
  "collaboration": 8.5,
  "strengths": ["Strong communication", "High efficiency"],
  "weaknesses": ["Limited cross-training", "Resource constraints"],
  "recommendations": ["Action 1", "Action 2"]
}
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a team performance analyst. Evaluate team dynamics, productivity, and collaboration to provide actionable insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || '{"teams": []}');
      return result.teams || [];
    } catch (error) {
      console.error('Team performance analysis error:', error);
      return [];
    }
  }

  async generateTrainingRecommendations(userPerformanceData: any): Promise<TrainingRecommendation[]> {
    if (!openai) return [];
    
    try {
      const prompt = `
Based on user performance data, generate personalized training recommendations:

PERFORMANCE DATA:
${JSON.stringify(userPerformanceData, null, 2)}

For each user, identify:
- Skill gaps and areas for improvement
- Recommended training courses
- Learning paths
- Priority levels
- Timeline for development

Return a JSON array of training recommendations with this structure:
{
  "userId": "user_id",
  "skillGaps": ["Data Analysis", "Leadership", "Technical Skills"],
  "recommendedCourses": [
    {
      "title": "Advanced Excel Analytics",
      "description": "Master data analysis with Excel",
      "priority": "high",
      "estimatedDuration": "40 hours",
      "provider": "LinkedIn Learning"
    }
  ],
  "learningPath": ["Foundation Course", "Intermediate", "Advanced"],
  "timeline": "3 months"
}
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a learning and development specialist. Create personalized training programs based on performance analysis and skill gap identification."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || '{"recommendations": []}');
      return result.recommendations || [];
    } catch (error) {
      console.error('Training recommendation error:', error);
      return [];
    }
  }

  async identifyTopPerformers(performanceData: any): Promise<{
    topPerformers: string[];
    criteria: string;
    insights: string[];
    recognitionSuggestions: string[];
  }> {
    if (!openai) {
      return {
        topPerformers: [],
        criteria: 'OpenAI configuration required',
        insights: [],
        recognitionSuggestions: []
      };
    }
    
    try {
      const prompt = `
Identify top performers from this performance data:

PERFORMANCE DATA:
${JSON.stringify(performanceData, null, 2)}

Analyze:
- Performance metrics and KPIs
- Consistency and reliability
- Growth and improvement trends
- Contribution to team success
- Leadership potential

Return JSON with:
{
  "topPerformers": ["User1", "User2"],
  "criteria": "Selection criteria used",
  "insights": ["Insight 1", "Insight 2"],
  "recognitionSuggestions": ["Recognition idea 1", "Recognition idea 2"]
}
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a performance management expert. Identify top performers and provide recognition strategies."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Top performer identification error:', error);
      return {
        topPerformers: [],
        criteria: 'Unable to determine criteria',
        insights: [],
        recognitionSuggestions: []
      };
    }
  }

  async generatePerformanceInsights(dashboardData: any): Promise<{
    overallTrends: string[];
    departmentAnalysis: Array<{
      department: string;
      performance: number;
      trend: string;
      recommendations: string[];
    }>;
    actionItems: string[];
    riskFactors: string[];
  }> {
    if (!openai) {
      return {
        overallTrends: [],
        departmentAnalysis: [],
        actionItems: [],
        riskFactors: []
      };
    }
    
    try {
      const prompt = `
Generate comprehensive personnel performance insights from dashboard data:

DASHBOARD DATA:
${JSON.stringify(dashboardData, null, 2)}

Provide analysis covering:
- Overall workforce trends
- Department-wise performance
- Immediate action items
- Risk factors to monitor

Return JSON with structured insights.
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an HR business intelligence analyst. Extract workforce insights from business data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Performance insights error:', error);
      return {
        overallTrends: [],
        departmentAnalysis: [],
        actionItems: [],
        riskFactors: []
      };
    }
  }

  // Mock data generators for demo purposes
  generateMockUserData(userCount: number = 10): any {
    const users = [];
    const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eva Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor', 'Iris Chen', 'Jack Anderson'];
    
    for (let i = 0; i < userCount; i++) {
      users.push({
        userId: `user_${i + 1}`,
        userName: names[i] || `User ${i + 1}`,
        loginCount: Math.floor(Math.random() * 50) + 10,
        totalHours: Math.floor(Math.random() * 100) + 20,
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        featuresUsed: ['dashboard', 'reports', 'analytics'].slice(0, Math.floor(Math.random() * 3) + 1),
        tasksCompleted: Math.floor(Math.random() * 50) + 5,
        score: Math.floor(Math.random() * 40) + 60
      });
    }
    
    return { users };
  }

  generateMockTeamData(): any {
    return {
      teams: [
        {
          teamId: 'sales',
          teamName: 'Sales Team',
          memberCount: 8,
          avgPerformance: 85,
          revenueGenerated: 250000,
          tasksCompleted: 145
        },
        {
          teamId: 'marketing',
          teamName: 'Marketing Team',
          memberCount: 5,
          avgPerformance: 78,
          campaignsLaunched: 12,
          conversionRate: 3.2
        },
        {
          teamId: 'development',
          teamName: 'Development Team',
          memberCount: 12,
          avgPerformance: 92,
          featuresDelivered: 28,
          bugFixRate: 95
        }
      ]
    };
  }

  private generateMockUserBehavior(): UserBehaviorAnalysis[] {
    return [
      {
        userId: 'user_001',
        userName: 'Sarah Wilson',
        loginFrequency: 28,
        averageSessionDuration: 52,
        mostActiveHours: ['09:00-12:00', '14:00-16:00'],
        featuresUsed: ['dashboard', 'analytics', 'reports', 'ai-chat'],
        performanceScore: 9.2,
        activityTrend: 'increasing',
        lastActive: '2024-01-16',
        recommendations: [
          'Excellent engagement - consider advanced training',
          'Share best practices with team members',
          'Candidate for leadership development'
        ]
      },
      {
        userId: 'user_002',
        userName: 'Michael Chen',
        loginFrequency: 18,
        averageSessionDuration: 35,
        mostActiveHours: ['10:00-13:00', '15:00-17:00'],
        featuresUsed: ['dashboard', 'reports'],
        performanceScore: 7.8,
        activityTrend: 'stable',
        lastActive: '2024-01-15',
        recommendations: [
          'Encourage exploration of AI features',
          'Provide analytics training',
          'Set engagement goals for improvement'
        ]
      }
    ];
  }

  private generateMockTeamPerformance(): TeamPerformance[] {
    return [
      {
        teamId: 'team_sales',
        teamName: 'Sales Team',
        members: this.generateMockUserBehavior(),
        overallScore: 8.5,
        productivity: 87,
        collaboration: 92,
        strengths: [
          'High feature adoption rate',
          'Consistent daily engagement',
          'Strong dashboard utilization'
        ],
        weaknesses: [
          'Underutilizing AI chat features',
          'Report generation could be automated'
        ],
        recommendations: [
          'Implement AI chat training program',
          'Set up automated report workflows',
          'Recognize top performers publicly'
        ]
      }
    ];
  }
}

export const personnelAssistant = new PersonnelManagementAssistant();