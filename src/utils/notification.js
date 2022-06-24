import Notify from "simple-notify";

export const notify = (status, title, text) => {
  try {
    new Notify({
      status,
      title,
      text,
      effect: "slide",
      speed: 300,
      customClass: "",
      customIcon: "",
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 5000,
      gap: 20,
      distance: 20,
      type: 1,
      position: "right bottom",
    });
  } catch (error) {
    console.log("notify error: ", error);
  }
};