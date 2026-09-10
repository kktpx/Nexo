export const KNOWN_SKILLS: string[] = [
  // Frontend
  "javascript", "typescript", "react", "next.js", "vue", "angular", "svelte",
  "html", "css", "sass", "tailwind css",
  // Backend
  "node.js", "express", "nestjs", "fastify",
  "python", "django", "flask", "fastapi",
  "java", "spring", "spring boot",
  "c#", ".net", "go", "rust", "ruby", "php", "laravel",
  // Database
  "postgresql", "mysql", "mongodb", "redis", "sqlite", "firebase",
  // DevOps
  "docker", "kubernetes", "aws", "azure", "gcp", "terraform",
  "ci/cd", "github actions", "jenkins",
  // Tools
  "git", "linux", "nginx", "figma", "storybook",
  // API
  "rest api", "graphql", "websocket", "grpc",
  // Testing
  "jest", "vitest", "cypress", "playwright", "selenium",
  // Security
  "oauth", "jwt", "web security",
  // Data
  "machine learning", "data science", "pandas", "tensorflow",
];

export const SKILL_ALIASES: Record<string, string> = {
  "reactjs": "react",       "react.js": "react",       "react js": "react",
  "nextjs": "next.js",      "next js": "next.js",
  "nodejs": "node.js",      "node": "node.js",          "node js": "node.js",
  "expressjs": "express",   "express.js": "express",
  "postgres": "postgresql",  "psql": "postgresql",
  "mongo": "mongodb",
  "ts": "typescript",        "js": "javascript",
  "k8s": "kubernetes",
  "tailwind": "tailwind css","tailwindcss": "tailwind css",
  "vuejs": "vue",            "vue.js": "vue",
  "angularjs": "angular",   "angular.js": "angular",
  "springboot": "spring boot","spring-boot": "spring boot",
  "dotnet": ".net",          "dot net": ".net",
  "ci cd": "ci/cd",          "cicd": "ci/cd",
  "restapi": "rest api",     "rest-api": "rest api",
  "graphql api": "graphql",
  "ml": "machine learning",
};
