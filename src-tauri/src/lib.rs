// This file contains the core logic for the WiredChats application.
// It defines Tauri commands, manages chat data, and handles backend functionality.

use std::collections::HashMap;
use std::sync::Mutex;
use lazy_static::lazy_static;

lazy_static! {
    static ref CHATS: Mutex<HashMap<String, Vec<String>>> = Mutex::new(HashMap::new());
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn send_message(chat_name: String, message: String) -> Result<(), String> {
    let mut chats = CHATS.lock().map_err(|_| "Failed to acquire lock")?;
    chats.entry(chat_name).or_insert_with(Vec::new).push(message);
    Ok(())
}

#[tauri::command]
pub fn get_messages(chat_name: String) -> Result<Vec<String>, String> {
    let chats = CHATS.lock().map_err(|_| "Failed to acquire lock")?;
    Ok(chats.get(&chat_name).cloned().unwrap_or_default())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, send_message, get_messages])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
