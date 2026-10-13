# 💖 Will You Go Out With Me? — Official Romantic Date Pass & Date Planner 💌

An interactive, romantic date proposal and planning web application with cute pastel pink aesthetic, smooth micro-animations, playful mechanics, and realistic scannable Date Pass tickets!

![Date Planner Preview](assets/asking.jpg)

---

## ✨ Features

- 💌 **The Proposal Screen**:
  - Heartfelt letter badge with personalized names (supports `?her=Name&him=Sender`).
  - Rock-solid "YES! 💖" button and an elusive "Think again! 😜" button that playfully dodges cursor and touch interactions.
  - Interactive background with floating pastel hearts, sakura blossoms, and cute sparkles.
  - Zero-dependency custom Web Audio synthesizer for cute sound effects and a romantic melody music box toggle.

- 🌸 **The Date Planner (Unlocked on YES)**:
  - Multi-select date destinations (Chill cafés, Movie night, Korean BBQ / Hotpot, Arcade & Claw machine, Sunset walk, or secret custom place).
  - Sweet treat bonus chips (Full-topping boba tea, ice cream, pastries, street food, fresh fruit juice).
  - Real-time date indicators with dynamic presets ("Tối Thứ Bảy", "Chủ Nhật", "Tối mai", "Tối nay", or customizable `dd/MM/yyyy` picker).
  - Pickup options and custom sweet notes.

- 🎟️ **Official Date Pass Ticket (Stage 3)**:
  - Authentic airline/concert style boarding pass layout with side cutout notches and perforated dividers.
  - Realistic vintage pink **APPROVED** stamp with animation and stamp sound effect.
  - **Scannable QR Code**: Large, low-density, high-contrast QR code that displays full date pass details when scanned with any smartphone camera or Zalo QR scanner!
  - 📸 **Download Ticket as Image**: Generates a high-resolution PNG image of the ticket directly to your phone or computer.
  - 🎉 **Confetti Celebration**: Multi-angle colorful confetti burst with sound effects.

---

## 🚀 How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/TriCuong28/Date-w-Me.git
   cd Date-w-Me
   ```

2. Start the local server:
   ```bash
   node server.js
   ```
   Or open with VS Code Live Server / double-click `index.html`.

3. Open your browser and navigate to:
   ```
   http://localhost:5500/
   ```

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Push this project to your GitHub repository.
2. Go to **Settings** > **Pages** in your repository.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your romantic date proposal website will be live in 1-2 minutes at:
   `https://TriCuong28.github.io/Date-w-Me/`

---

## 🎨 Technologies Used

- **HTML5 & Vanilla CSS3**: Custom design system, pastel gradients, responsive layouts, glassmorphism.
- **Modern JavaScript (ES6+)**: Custom state management, Web Audio API sound synthesis.
- **Libraries (via CDN)**:
  - `canvas-confetti` (Festive celebration effects)
  - `html2canvas` (Export ticket as HD PNG image)
  - `qrcodejs` (Client-side QR code generation)

---

Made with all my heart 💖
