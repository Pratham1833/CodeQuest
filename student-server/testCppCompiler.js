const fs = require("fs");
const { exec } = require("child_process");

// Sample C++ code
const cppCode = `
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
`;

// Write code to a file
fs.writeFileSync("main.cpp", cppCode);

// Compile the C++ code
exec("g++ main.cpp -o main", (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Compilation error:", stderr);
    return;
  }

  console.log("✅ Compilation successful!");

  // Run the compiled program and pass input
  const input = "10 20"; // You can change this
  const run = exec("main.exe");

  run.stdin.write(input);
  run.stdin.end();

  run.stdout.on("data", (data) => {
    console.log("📤 Output:", data.toString());
  });

  run.stderr.on("data", (data) => {
    console.error("⚠️ Runtime error:", data.toString());
  });
});
