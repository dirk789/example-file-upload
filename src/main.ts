const form = document.querySelector<HTMLFormElement>("form");
const input = document.querySelector<HTMLCanvasElement>("input[type='file']");
const canvas = document.querySelector<HTMLCanvasElement>("canvas");

const ctx = canvas?.getContext("2d");

const FILE_TARGET = "image/png";

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log({ e });
    const file = (e.target as any)?.[0]?.files[0];

    if (file) {
      handleFileUpload();
    }
  });
}

// Filereader API
if (input) {
  input.addEventListener("change", (e) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL((e.target as any).files[0]);
    const img = new Image();
    img.src = url;

    img.onload = function () {
      const { width, height } = img;
      console.log({ img });

      if (ctx && canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
      }
    };
  });
}

function handleFileUpload() {
  if (!canvas) {
    throw new Error("No file upload");
  }
  const blobb = canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    let file = new File([blob], "fileName.jpg", { type: FILE_TARGET });
    console.log({ file });
    downloadFile(file, "Test");
  }, FILE_TARGET);

  console.log({ blobb });
}

function downloadFile(blob: Blob, filename: string) {
  const elem = window.document.createElement("a");
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

export {};
