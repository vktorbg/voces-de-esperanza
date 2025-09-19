package com.vocesdeesperanza.app;

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
    }
}
