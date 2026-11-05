// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — LangGraph Workflow Assembly
// ─────────────────────────────────────────────────────────────────────────────

import { StateGraph } from "@langchain/langgraph";
import { CouncilStateAnnotation } from "./state";
import {
  initializeDebate,
  generateRoundContributions,
  advanceRound,
  judgeEvaluation,
  saveDebate,
  shouldContinueRounds,
} from "./nodes";

export function buildCouncilWorkflow() {
  const workflow = new StateGraph(CouncilStateAnnotation)
    // Add nodes
    .addNode("initialize", initializeDebate)
    .addNode("generate_round", generateRoundContributions)
    .addNode("advance_round", advanceRound)
    .addNode("judge", judgeEvaluation)
    .addNode("save", saveDebate)

    // Define edges
    .addEdge("__start__", "initialize")
    .addEdge("initialize", "generate_round")
    .addEdge("generate_round", "advance_round")
    .addConditionalEdges("advance_round", shouldContinueRounds, {
      generate_round: "generate_round",
      judge: "judge",
    })
    .addEdge("judge", "save")
    .addEdge("save", "__end__");

  return workflow.compile();
}
