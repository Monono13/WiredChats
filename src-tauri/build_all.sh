#!/bin/bash
set -e

echo "🪟 Compilando para Windows..."
cargo tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc

echo "🔧 Compilando para Linux..."
cargo tauri build

echo "✅ Builds completadas"
