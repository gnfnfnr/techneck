export function notify() {
  if (window.Notification) {
    Notification.requestPermission();
  } else {
    alert("알람이 지원되지 않습니다.");
  }

  if (Notification.permission !== "granted") {
    alert("notification is disabled");
  } else {
    new Notification("올바른 자세로 만들어주세요", {
      icon: require("../../img/logoImage.png"),
      body: "허리는 일자로 펴고 앉으시되 앞으로 나온 턱을 뒤로 밀어 넣고, 어깨를 편 자세를 함께 유지해주세요.",
    });
  }
}
