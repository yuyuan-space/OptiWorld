const OPTIWORLD_VIDEO_ROOT = "./static/videos/optiworld";

function setVideo(videoId, src) {
  const video = document.getElementById(videoId);
  if (!video) return;
  video.src = src;
  video.load();
  const playPromise = video.play();
  if (playPromise) {
    playPromise.catch(() => {});
  }
}

function setImage(imageId, src) {
  const image = document.getElementById(imageId);
  if (!image) return;
  image.src = src;
}

function setActiveButton(selector, caseId) {
  document.querySelectorAll(`${selector} .button`).forEach(button => {
    button.classList.toggle("is-active", button.dataset.case === String(caseId));
  });
}

function updateI2V(caseId) {
  const base = `${OPTIWORLD_VIDEO_ROOT}/image_goal_conditioned_I2V/comparison_${caseId}`;
  setImage("i2v-input", `${base}/path_overlay_clean.png`);
  setVideo("i2v-OptiWorld", `${base}/OptiWorld.mp4`);
  setVideo("i2v-VLIPP", `${base}/VLIPP.mp4`);
  setVideo("i2v-CosmosPredict", `${base}/CosmosPredict.mp4`);
  setVideo("i2v-HunyuanVideo", `${base}/HunyuanVideo.mp4`);
  setVideo("i2v-Wan", `${base}/Wan.mp4`);
  setActiveButton(".i2v-selector", caseId);
}

function updateMoreI2V(caseId) {
  const base = `${OPTIWORLD_VIDEO_ROOT}/image_goal_conditioned_I2V/more_cases_by_OptiWorld`;
  setImage("more-i2v-plan", `${base}/case_${caseId}_plan.png`);
  setVideo("more-i2v-video", `${base}/case_${caseId}_output.mp4`);
  setActiveButton(".case-selector", caseId);
}

function updateV2V(caseId) {
  const base = `${OPTIWORLD_VIDEO_ROOT}/video_dynamics_editing`;
  setVideo("v2v-source", `${base}/case_${caseId}_source_video.mp4`);
  setVideo("v2v-wan", `${base}/case_${caseId}_WanFLF.mp4`);
  setVideo("v2v-optiworld", `${base}/case_${caseId}_OptiWorld.mp4`);
  setImage("v2v-source-tracks", `${base}/case_${caseId}_source_tracks.png`);
  setImage("v2v-all-tracks", `${base}/case_${caseId}_OptiWorld_all_optimized_tracks.png`);
  setImage("v2v-path", `${base}/case_${caseId}_OptiWorld_optimized_path_comparison.png`);
  setActiveButton(".v2v-selector", caseId);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".i2v-selector .button").forEach(button => {
    button.addEventListener("click", () => updateI2V(button.dataset.case));
  });

  document.querySelectorAll(".case-selector .button").forEach(button => {
    button.addEventListener("click", () => updateMoreI2V(button.dataset.case));
  });

  document.querySelectorAll(".v2v-selector .button").forEach(button => {
    button.addEventListener("click", () => updateV2V(button.dataset.case));
  });

  updateI2V(1);
  updateMoreI2V(1);
  updateV2V(1);
});
