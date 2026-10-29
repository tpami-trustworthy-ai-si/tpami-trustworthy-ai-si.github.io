/** Public CFP topics from the approved proposal appendix. */
export interface TopicArea {
  number: string;
  title: string;
  icon: string;
  items: string[];
}

export const topicAreas: TopicArea[] = [
  {
    number: '01',
    icon: 'shield',
    title: 'Attacks and Threat Modelling',
    items: [
      'Adversarial examples: white-box, black-box, and physical-world attacks',
      'Backdoor / trojan attacks on visual and multimodal models',
      'Data poisoning, model supply-chain, and training-time attacks',
      'Privacy attacks: membership inference, model inversion, attribute inference',
      'Prompt injection and jailbreaking of LLMs and vision–language models',
      'Visual prompt injection targeting multimodal AI agents',
      'Deepfake generation and detection',
    ],
  },
  {
    number: '02',
    icon: 'check-badge',
    title: 'Robustness and Defences',
    items: [
      'Adversarial training: AT, TRADES, and variants for vision models',
      'Certified defences and formal verification of neural networks',
      'Test-time defences, purification, and anomaly/OOD detection',
      'Robustness of foundation models and zero/few-shot learners',
      'Backdoor detection, Neural Cleanse, and model unlearning',
    ],
  },
  {
    number: '03',
    icon: 'database',
    title: 'Privacy-Preserving Learning',
    items: [
      'Federated learning: security, poisoning, and Byzantine robustness',
      'Differential privacy in vision with utility–privacy tradeoff analysis',
      'Unlearnable examples and machine unlearning',
      'IP protection via adversarial watermarking and model fingerprinting',
    ],
  },
  {
    number: '04',
    icon: 'users',
    title: 'Fairness, Accountability, and Explainability',
    items: [
      'Bias detection and mitigation in visual recognition and generative AI',
      'Interpretability and explainability for safety-critical vision systems',
      'Auditing frameworks and third-party certification of AI models',
    ],
  },
  {
    number: '05',
    icon: 'robot',
    title: 'AI Agent and LLM Safety',
    items: [
      'Security of autonomous AI agents: tool-call manipulation, environment injection',
      'Hallucination detection and factual grounding of MLLMs',
      'Red-teaming and safety benchmarks for foundation and agentic models',
      'Safe reinforcement learning for embodied AI',
    ],
  },
  {
    number: '06',
    icon: 'sparkles',
    title: 'Applications in High-Stakes Domains',
    items: [
      'Trustworthy biometrics under adversarial conditions',
      'Robust medical image analysis',
      'Security of perception systems in autonomous vehicles and robotics',
      'Synthetic media detection for forensics and disinformation defence',
    ],
  },
];
