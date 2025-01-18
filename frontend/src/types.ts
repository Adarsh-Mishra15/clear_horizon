export interface User {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AstigmatismResult {
  distortedLines: number[];
  blurryText: boolean;
  shapeDistortion: boolean;
  gridDistortion: boolean;
  contrastSensitivity: number;
}

export interface VisionTestResult {
  snellenScore: string;
  astigmatismResult: AstigmatismResult;
  blurSensitivity: number;
  timestamp: Date;
}

export interface LifestyleData {
  screenTime: number;
  outdoorHours: number;
  readingPosture: string;
  lastUpdated: Date;
}