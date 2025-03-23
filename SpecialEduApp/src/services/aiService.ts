import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

interface LearningAssessment {
  studentId: string;
  grade: string;
  subject: string;
  performance: {
    accuracy: number;
    speed: number;
    engagement: number;
  };
  observations: string[];
}

interface CurriculumRecommendation {
  activities: {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedDuration: string;
  }[];
  focusAreas: string[];
  learningStyle: string;
  specialNeeds: string[];
}

class AIService {
  private static instance: AIService;
  private model: string = 'llama2'; // or any other model you have in Ollama

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private async generateWithOllama(prompt: string): Promise<string> {
    try {
      const response = await axios.post<OllamaResponse>(OLLAMA_API_URL, {
        model: this.model,
        prompt: prompt,
        stream: false,
      });

      return response.data.response;
    } catch (error) {
      console.error('Error generating with Ollama:', error);
      throw error;
    }
  }

  public async analyzeLearningNeeds(assessment: LearningAssessment): Promise<CurriculumRecommendation> {
    const prompt = `
      Analyze the following learning assessment and provide curriculum recommendations:
      
      Grade: ${assessment.grade}
      Subject: ${assessment.subject}
      Performance:
      - Accuracy: ${assessment.performance.accuracy}%
      - Speed: ${assessment.performance.speed}
      - Engagement: ${assessment.performance.engagement}
      
      Observations:
      ${assessment.observations.map(obs => `- ${obs}`).join('\n')}
      
      Please provide:
      1. Recommended learning activities with difficulty levels
      2. Areas that need focus
      3. Suggested learning style
      4. Any special needs considerations
      
      Format the response as JSON.
    `;

    const response = await this.generateWithOllama(prompt);
    return JSON.parse(response);
  }

  public async generatePersonalizedLesson(
    grade: string,
    subject: string,
    learningStyle: string,
    specialNeeds: string[]
  ): Promise<{
    title: string;
    objectives: string[];
    activities: {
      name: string;
      description: string;
      duration: string;
      materials: string[];
    }[];
    assessment: {
      type: string;
      questions: string[];
    };
  }> {
    const prompt = `
      Generate a personalized lesson plan for:
      
      Grade: ${grade}
      Subject: ${subject}
      Learning Style: ${learningStyle}
      Special Needs: ${specialNeeds.join(', ')}
      
      Include:
      1. Lesson title
      2. Learning objectives
      3. Detailed activities with materials needed
      4. Assessment questions
      
      Format the response as JSON.
    `;

    const response = await this.generateWithOllama(prompt);
    return JSON.parse(response);
  }

  public async adaptContent(
    content: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    specialNeeds: string[]
  ): Promise<string> {
    const prompt = `
      Adapt the following educational content for:
      Difficulty Level: ${difficulty}
      Special Needs: ${specialNeeds.join(', ')}
      
      Content:
      ${content}
      
      Please provide an adapted version that is:
      1. More accessible
      2. Engaging
      3. Suitable for the specified difficulty level
      4. Accommodating of the special needs
    `;

    return await this.generateWithOllama(prompt);
  }
}

export default AIService; 