package com.vocesdeesperanza.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MainActivity";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Try to initialize Firebase early using reflection so we don't require the
        // Firebase SDK at compile time. If the SDK (and google-services.json) is
        // present, this will initialize Firebase; otherwise we skip it safely.
        try {
            Class<?> firebaseAppClass = Class.forName("com.google.firebase.FirebaseApp");
            java.lang.reflect.Method initializeApp = firebaseAppClass.getMethod("initializeApp", android.content.Context.class);
            initializeApp.invoke(null, this);
        } catch (ClassNotFoundException e) {
            Log.w(TAG, "Firebase SDK not present, skipping initialization.");
        } catch (Exception e) {
            Log.w(TAG, "Firebase initialization failed: " + e.getMessage());
        }

        super.onCreate(savedInstanceState);

        // Create notification channels (required for Android 8+)
        createNotificationChannels();
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager == null) return;

            // Devotional channel
            NotificationChannel devotionalChannel = new NotificationChannel(
                "devotional_notifications",
                "Devocional Diario",
                NotificationManager.IMPORTANCE_HIGH
            );
            devotionalChannel.setDescription("Notificaciones del devocional diario");
            devotionalChannel.enableVibration(true);
            manager.createNotificationChannel(devotionalChannel);

            // Videos channel
            NotificationChannel videosChannel = new NotificationChannel(
                "new_videos",
                "Nuevos Videos",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            videosChannel.setDescription("Notificaciones de nuevos videos");
            manager.createNotificationChannel(videosChannel);

            // Default channel (fallback)
            NotificationChannel defaultChannel = new NotificationChannel(
                "default",
                "General",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            defaultChannel.setDescription("Notificaciones generales");
            manager.createNotificationChannel(defaultChannel);

            Log.d(TAG, "Notification channels created.");
        }
    }
}
