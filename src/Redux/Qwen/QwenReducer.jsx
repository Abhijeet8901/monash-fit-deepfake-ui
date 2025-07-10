import { 
    RUN_QWEN_FAILURE, 
    RUN_QWEN_REQUEST, 
    RUN_QWEN_SUCCESS 
} from "./QwenActionType"

const initialState = {
    explanations: {},
    edit_instructions: null,
    loading: false,
    error: null
}

export const qwenReducer = (state = initialState, action) => {
    switch (action.type) {
        case RUN_QWEN_REQUEST:
            return { ...state, loading: true }
        case RUN_QWEN_SUCCESS:
            return { ...state, loading: false, explanations: processQwenExplanations(action.payload), edit_instructions: processQwenEditInstructions(action.payload)}
        case RUN_QWEN_FAILURE:
            return { ...state, loading: false, error: action.payload.error}
        default:
            return state;
    }
}

// const processQwenExplanations = (simple_explanation) => {
//     const lines = simple_explanation.split('\n');
//     const result = {};

//     lines.forEach(line => {
//         const trimmed = line.trim();
//         if (!trimmed.startsWith('-')) return;  // ignore non-bullet lines

//         const content = trimmed.slice(1).trim();  // remove leading '-'
//         const colonIndex = content.indexOf(':');

//         if (colonIndex === -1) return;  // no colon? skip

//         let key = content.slice(0, colonIndex).trim();
//         const value = content.slice(colonIndex + 1).trim();

//         key = key.replace(/^\*+/g, '').replace(/\*+$/g, ''); // remove asterisk"
        
//         const keysToIgnore = ["lighting", "edges", "perspective", "perspective relationship", "shadows", "physical laws"]

//         if(!keysToIgnore.includes(key.toLowerCase())){
//             result[key] = value;
//         }
        
//     });

//     return result;
// }


const cleanJsonBlock = (rawStr) => {
  // Remove starting ```json and ending ```
  return rawStr
    .replace(/^```json\s*/, '')   // remove starting line with ```json
    .replace(/```$/, '')          // remove ending ```
    .trim();
}
const processQwenExplanations = (json_str) => {

    try {
    const cleanStr = cleanJsonBlock(json_str);
    const data = JSON.parse(cleanStr);
    const result = {};

    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'object' && value.simple_explanation) {
        result[key] = {
          simple_explanation: value.simple_explanation?.trim() || '',
          edit_instruction: value.edit_instruction?.trim() || '',
          emoji: value.emoji || '🕵️'
        }
      }
    }

    return result;
  } catch (e) {
    console.error("Invalid JSON input:", e);
    return {};
  }

}
    
const processQwenEditInstructions = (json_str) => {
    try {
    const cleanStr = cleanJsonBlock(json_str);
    const data = JSON.parse(cleanStr);
    let instructions = "";

    for (const value of Object.values(data)) {
      if (value && typeof value === 'object' && value.edit_instruction) {
        instructions += value.edit_instruction.trim();
        if (!value.edit_instruction.trim().endsWith(".")) {
          instructions += ".";
        }
        instructions += " ";

      }
    }

    return instructions.trim();
  } catch (e) {
    console.error("Invalid JSON input:", e);
    return [];
  }
}