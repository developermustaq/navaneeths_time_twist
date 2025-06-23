
# ⏳ Navaneeth's Time Twist

> A quirky time management app where **1 Navaneeth hour = 48 real-world hours** — because some friends just *never* deliver on time.

🔗 Live Demo
👉 https://navaneeths-time-twist.vercel.app

## 💡 Why I Created This

This app is dedicated to my friend **Navaneeth**, a serial task delayer. After countless delays, missed deadlines, and “I’ll do it tomorrow” replies, I decided to gamify his approach to time — by stretching it ridiculously. Thus, **Navaneeth's Time Twist** was born.

Instead of fixing procrastination, this app leans into it — redefining urgency with humor. A “Navaneeth Hour” gives you **48 real hours** to complete a task, giving procrastinators a sense of time… twisted.

## 🛠️ Tech Stack

TypeScript, CSS

## 🚀 Features

* ✍️ **Add Tasks**: Create tasks with a time limit measured in *Navaneeth Hours*.
* 🕐 **Time Logic**: 1 Navaneeth Hour = 48 Real Hours.
* ⌛ **Task Expiry**:

  * Once the time runs out, the task presents two choices:

    * ✅ **Complete** – Task is marked as done.
    * ❌ **Not Complete** – Task is marked as **Dead**.
  * 😴 If no action is taken after time expires, the task is **automatically moved to Dead Tasks**.
* 🪦 **Dead Task List**: View all the forgotten or failed tasks (RIP).
* 📊 **Simple UI**: Clean, distraction-free interface to focus on tasks (or delay them stylishly).

## 🔍 How It Works

1. **Add a Task**:

   * Name the task
   * Choose the number of Navaneeth Hours
   * Submit and the countdown begins (48 hours per N-hour)

2. **Countdown Runs**:

   * The timer operates in real time, converting Navaneeth Hours to actual duration.

3. **Time Up?** You Decide:

   * When the time expires, you'll see:

     * ✅ Mark as Complete
     * ❌ Mark as Not Complete 
   * If no response: the app will **auto-mark** the task as **Dead** after a buffer period.

4. **Task States**:

   * 🟢 Active
   * 🟡 Awaiting Completion
   * 🔴 Dead


## 🧪 Future Enhancements

* Notification system before task expiry
* Leaderboard of most dead tasks (for fun)
* Dark mode
* Navaneeth Quotes on delay

## 🧑‍💻 Contributing

Want to extend the twist? Fork the repo and send in a PR! Contributions are welcome for features, design improvements, or optimization.

## 📜 License

MIT License

---

