// ==========================================================================
// EmotionAI — frontend logic
// Talks only to the existing FastAPI backend at /predict.
// No model logic lives here — the prediction always comes from the API.
// ==========================================================================

const API_URL = "https://emotionai-nbzi.onrender.com/predict";
const MAX_CHARS = 500;

// ---- element references ---------------------------------------------------

const form = document.getElementById("emotion-form");
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const validationMessage = document.getElementById("validation-message");
const analyzeBtn = document.getElementById("analyze-btn");
const btnLabel = analyzeBtn.querySelector(".btn-label");
const errorMessage = document.getElementById("error-message");

const resultSection = document.getElementById("result-section");
const resultIcon = document.getElementById("result-icon");
const resultEmotion = document.getElementById("result-emotion");
const resultDescription = document.getElementById("result-description");
const wakeMessage = document.getElementById("wake-message");

// ---- emotion presentation map ---------------------------------------------
// Only affects how a returned emotion is *displayed*.
// The emotion itself always comes from the API response.

const EMOTION_MAP = {
  joy: {
    icon: "😄",
    description: "Your text expresses happiness, positivity, or excitement.",
    color: "var(--joy)",
  },
  sadness: {
    icon: "😔",
    description: "Your text expresses feelings of sadness or disappointment.",
    color: "var(--sadness)",
  },
  anger: {
    icon: "😠",
    description: "Your text expresses frustration, irritation, or anger.",
    color: "var(--anger)",
  },
  fear: {
    icon: "😟",
    description: "Your text expresses worry, uncertainty, or fear.",
    color: "var(--fear)",
  },
  love: {
    icon: "💛",
    description: "Your text expresses affection, care, or emotional connection.",
    color: "var(--love)",
  },
  surprise: {
    icon: "😲",
    description: "Your text expresses unexpectedness or surprise.",
    color: "var(--surprise)",
  },
  neutral: {
    icon: "🙂",
    description: "Your text appears relatively neutral or emotionally balanced.",
    color: "var(--neutral)",
  },
};

const FALLBACK_EMOTION = {
  icon: "🔎",
  description: "The model detected an emotional pattern in your text.",
  color: "var(--accent)",
};

// ---- helpers ----------------------------------------------------------------

/** Turn "joy" / "SADNESS" / "not_sure" into "Joy" / "Sadness" / "Not sure". */
function formatEmotionLabel(rawEmotion) {
  const cleaned = String(rawEmotion).trim().replace(/[_-]+/g, " ").toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function getEmotionInfo(rawEmotion) {
  const key = String(rawEmotion).trim().toLowerCase();
  return EMOTION_MAP[key] || FALLBACK_EMOTION;
}

function setLoading(isLoading) {
  analyzeBtn.disabled = isLoading;
  analyzeBtn.classList.toggle("is-loading", isLoading);
  btnLabel.textContent = isLoading ? "Analyzing..." : "Analyze Emotion";
  wakeMessage.hidden = !isLoading;   // ← new line: show/hide with loading state
}

function showValidationMessage(message) {
  validationMessage.textContent = message;
}

function clearValidationMessage() {
  validationMessage.textContent = "";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
}

function hideResult() {
  resultSection.classList.remove("is-visible");
  resultSection.hidden = true;
}

function showResult(rawEmotion) {
  const info = getEmotionInfo(rawEmotion);

  resultIcon.textContent = info.icon;
  resultEmotion.textContent = formatEmotionLabel(rawEmotion);
  resultDescription.textContent = info.description;
  resultSection.style.setProperty("--emotion-color", info.color);

  resultSection.hidden = false;
  // reveal on the next frame so the transition actually plays
  requestAnimationFrame(() => resultSection.classList.add("is-visible"));

  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function updateCharCount() {
  const length = textInput.value.length;
  charCount.textContent = `${length} / ${MAX_CHARS}`;
  charCount.classList.toggle("is-near-limit", length >= MAX_CHARS);
}

// ---- API call ---------------------------------------------------------------

async function requestEmotionPrediction(text) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data || typeof data.predicted_emotion === "undefined") {
    throw new Error("Unexpected response format");
  }

  return data.predicted_emotion;
}

// ---- event wiring -------------------------------------------------------

textInput.addEventListener("input", () => {
  updateCharCount();
  if (textInput.value.trim().length > 0) clearValidationMessage();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = textInput.value.trim();

  clearError();
  hideResult();

  if (!text) {
    showValidationMessage("Please enter a sentence before analyzing.");
    textInput.focus();
    return;
  }

  clearValidationMessage();
  setLoading(true);

  try {
    const predictedEmotion = await requestEmotionPrediction(text);
    showResult(predictedEmotion);
  } catch (err) {
    if (err instanceof TypeError) {
      // fetch() throws a TypeError on network failure (e.g. backend not running)
      showError(
        "Unable to connect to the emotion analysis service. Please make sure the backend is running."
      );
    } else {
      showError("Something went wrong while analyzing your text. Please try again.");
    }
  } finally {
    setLoading(false);
  }
});

// initialize the character counter on load
updateCharCount();
