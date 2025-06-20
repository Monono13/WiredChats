// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

// Main entry point of the application
fn main() {
    tauri::Builder::default()
        // Invoke handler for Tauri commands
        .invoke_handler(tauri::generate_handler![
            wiredchats_lib::greet, // Command to greet users
            wiredchats_lib::send_message, // Command to send messages
            wiredchats_lib::get_messages // Command to retrieve messages
        ])
        // Run the Tauri application with the generated context
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // Additional functionality can be added here, such as:
    // - Custom plugins
    // - Event listeners
    // - Application lifecycle hooks
}
