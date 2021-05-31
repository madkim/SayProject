import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from "@capacitor/core";

const { PushNotifications } = Plugins;

export function registerPush() {
  PushNotifications.requestPermission().then((permission) => {
    if (permission.granted) {
      // Register to recieve push
      localStorage.setItem("pushNotificationsGranted", "true");
      PushNotifications.register();
    } else {
      // No permissions granted
      localStorage.setItem("pushNotificationsGranted", "false");
    }
  });

  PushNotifications.addListener(
    "registration",
    (token: PushNotificationToken) => {
      console.log("My token " + JSON.stringify(token));
    }
  );

  PushNotifications.addListener("registrationError", (error: any) => {
    console.log("Error " + JSON.stringify(error));
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    async (notification: PushNotification) => {
      console.log("Push recieved " + JSON.stringify(notification));
    }
  );

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    async (notification: PushNotificationActionPerformed) => {
      const data = notification.notification.data;
      console.log(
        "Action performed " + JSON.stringify(notification.notification)
      );
    }
  );
}
