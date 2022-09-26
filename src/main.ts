const form = document.querySelector<HTMLFormElement>("form");
const input = document.querySelector<HTMLCanvasElement>("input[type='file']");
const canvas = document.querySelector<HTMLCanvasElement>("canvas");

const ctx = canvas?.getContext("2d");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log({ e });
    const file = e.target?.[0]?.files[0];

    if (file) {
      handleFileUpload(file);
    }
  });
}

input &&
  input.addEventListener("change", (e) => {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL((e.target as any).files[0]);
    const img = new Image();
    img.src = url;

    img.onload = function () {
      const img_width = img.width;
      const img_height = img.height;

      var transformedX = 0;
      var transformedY = 0;

      /* Horizontaal! */
      if (img_width > img_height) {
        transformedX = 460;
        transformedY = (460 * img_height) / img_width;
      } else if (img_height > img_width) {
        transformedX = (460 * img_width) / img_height;
        transformedY = 460;
      } else {
        transformedX = 460;
        transformedY = 460;
      }

      if (ctx) {
        ctx.drawImage(img, 0, 0, transformedX, transformedY);
      }
    };
  });

function handleFileUpload(blob: Blob) {
  if (!canvas) {
    throw new Error("No file upload");
  }
  const blobb = canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
    console.log({ file });
    downloadFile(file, "Test");
  }, "image/jpeg");

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
