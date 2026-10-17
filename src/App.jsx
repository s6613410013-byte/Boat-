import { useState } from "react";

const metrics = [
  {
    title: "แบตเตอรี่สตาร์ทเครื่องยนต์",
    unit: "12V",
    subtitle: "ระบบสตาร์ทและจ่ายไฟเริ่มเครื่อง",
    values: [
      ["แรงดัน", "12.4 V"],
      ["อัปเดตล่าสุด", "09:41 น."],
    ],
  },
  {
    title: "แบตเตอรี่ระบบไฟภายในเรือ",
    unit: "24V",
    subtitle: "ระบบไฟแสงสว่างและอุปกรณ์ภายใน",
    values: [
      ["แรงดัน", "24 V"],
      ["อัปเดตล่าสุด", "09:41 น."],
    ],
  },
  {
    title: "กระแสไฟฟ้า",
    unit: "A",
    subtitle: "กระแสไฟฟ้าที่กำลังใช้งานในระบบ",
    values: [
      ["กำลังใช้งาน", "14.2 A"],
      ["ค่าเฉลี่ย", "12.8 A"],
      ["สูงสุด", "18.5 A"],
      ["ต่ำสุด", "8.1 A"],
    ],
  },
  {
    title: "พลังงานสะสม",
    unit: "Wh",
    subtitle: "พลังงานสะสมที่แบตเตอรี่และระบบเก็บไว้",
    values: [
      ["เก็บสะสม", "4,820 Wh"],
      ["ใช้ไป", "1,180 Wh"],
      ["คงเหลือ", "3,640 Wh"],
      ["อัปเดตล่าสุด", "09:41 น."],
    ],
  },
  {
    title: "กำลังไฟฟ้า",
    unit: "W",
    subtitle: "กำลังไฟฟ้าที่กำลังใช้งานในระบบ",
    values: [
      ["กำลังใช้งาน", "342 W"],
      ["ค่าเฉลี่ย", "308 W"],
      ["สูงสุด", "445 W"],
      ["ต่ำสุด", "195 W"],
    ],
  },
];

function Icon() {
  return (
    <span className="card-icon" aria-hidden="true">
      ϟ
    </span>
  );
}

function MetricCard({ item }) {
  return (
    <article className="panel metric-card">
      <header className="card-head">
        <Icon />

        <div>
          <h2>{item.title}</h2>
          <p>{item.subtitle}</p>
        </div>

        <strong className="unit">{item.unit}</strong>
      </header>

      <h3>สถานะการทำงาน</h3>

      <div className="values">
        {item.values.map(([label, value]) => (
          <div className="value" key={label}>
            <span>{label}</span>
            <b>{value}</b>
            <small>ข้อมูลตัวอย่าง</small>
          </div>
        ))}
      </div>
    </article>
  );
}

function Login({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className="login-screen">
      <img
        className="boat-logo"
        src="/assets/boat-monitor-logo.png"
        alt="เรือตรวจวัดค่าพารามิเตอร์"
      />

      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>
          Username
          <input
            required
            placeholder="Username"
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            required
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

function ChartCard() {
  return (
    <article className="panel chart-card">
      <header className="card-head">
        <Icon />

        <div>
          <h2>กราฟแรงดันไฟฟ้า</h2>
          <p>แรงดันแบตเตอรี่ 12V และ 24V เมื่อเวลาผ่านไป</p>
        </div>

        <strong className="unit">V</strong>
      </header>

      <div className="chart">
        <b>แรงดันไฟฟ้า (V) เมื่อเวลาผ่านไป</b>

        <svg
          viewBox="0 0 600 210"
          role="img"
          aria-label="กราฟแรงดันแบตเตอรี่"
        >
          {[35, 75, 115, 155].map((y) => (
            <line
              key={y}
              x1="20"
              y1={y}
              x2="585"
              y2={y}
            />
          ))}

          <polyline
            className="line24"
            points="40,62 150,63 260,65 370,64 480,63 570,64"
          />

          <polyline
            className="line12"
            points="40,145 150,146 260,148 370,147 480,146 570,148"
          />
        </svg>

        <div className="legend">
          <span>
            <i className="cyan" />
            แบตเตอรี่ 12V
          </span>

          <span>
            <i />
            แบตเตอรี่ 24V
          </span>
        </div>
      </div>
    </article>
  );
}

const replies = {
  "วันนี้ใช้งานไปกี่ชั่วโมง?":
    "ระบบใช้งานไปแล้วประมาณ 4.2 ชั่วโมง (ตัวอย่าง)",
  "แบตเตอรี่ปัจจุบันเหลือกี่ %?":
    "ข้อมูลเปอร์เซ็นต์แบตเตอรี่ไม่พร้อมใช้งานในตัวอย่างนี้",
  "ระบบมีข้อผิดพลาดอะไรไหม?":
    "ไม่พบข้อผิดพลาดในระบบ (ตัวอย่าง)",
};

function CameraChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  function ask(question) {
    const value = question.trim();

    if (!value) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        user: value,
        answer:
          replies[value] ||
          "รับคำถามแล้ว ระบบกำลังตรวจสอบข้อมูล (ตัวอย่าง)",
      },
    ]);

    setText("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(text);
  }

  function captureImage() {
    window.alert("บันทึกภาพนิ่งแล้ว (ตัวอย่าง)");
  }

  function openFullscreen() {
    document.documentElement.requestFullscreen?.();
  }

  return (
    <>
      <div className="connection">
        <b>สถานะการเชื่อมต่อ</b>

        <span>
          การเชื่อมต่อจำลอง • 12.4 แอมป์ต่อวินาที • อัปเดต 09:41 น.
        </span>

        <strong>ตัวอย่าง / เชื่อมต่อแล้ว</strong>
      </div>

      <section className="two-col">
        <article className="panel camera">
          <header className="card-head">
            <Icon />

            <div>
              <h2>กล้องในเรือ</h2>
              <p>กล้องในเรือ • ยังไม่ได้เปิดใช้งาน</p>
            </div>

            <strong className="unit">ยังไม่เปิด</strong>
          </header>

          <h3>ภาพจากกล้อง</h3>

          <div className="camera-box">
            <b>ยังไม่ได้เปิดใช้งาน</b>

            <p>
              พื้นที่แสดงภาพจากกล้อง
              <br />
              ในระบบจริงตรงนี้คือภาพสดจาก Pi Camera 3
              ที่ส่งมาแบบ MJPEG
            </p>
          </div>

          <div className="actions">
            <button type="button" onClick={captureImage}>
              ภาพนิ่ง
            </button>

            <button type="button" onClick={openFullscreen}>
              เปิดเต็มจอ
            </button>
          </div>
        </article>

        <article className="panel chat">
          <header className="card-head">
            <Icon />

            <div>
              <h2>ถามระบบ</h2>
              <p>สอบถามข้อมูลระบบและสถานะเรือ</p>
            </div>

            <strong className="unit">ระบบ</strong>
          </header>

          <div className="messages">
            <b>ประวัติการสนทนา</b>

            {messages.length === 0 && (
              <p className="empty">
                เลือกคำถามตัวอย่างหรือพิมพ์คำถามด้านล่าง
              </p>
            )}

            {messages.map((message, index) => (
              <div key={`${message.user}-${index}`}>
                <p className="bubble user">{message.user}</p>
                <p className="bubble system">{message.answer}</p>
              </div>
            ))}
          </div>

          <div className="quick">
            {Object.keys(replies).map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => ask(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form className="ask" onSubmit={handleSubmit}>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="พิมพ์คำถาม..."
              aria-label="คำถาม"
            />

            <button type="submit">ส่ง</button>
          </form>
        </article>
      </section>
    </>
  );
}

function Dashboard({ onLogout }) {
  const [page, setPage] = useState("overview");

  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <img
            className="mini-logo"
            src="/assets/boat-monitor-logo.png"
            alt=""
          />

          <b>Boat Monitor</b>
        </div>

        <nav aria-label="เมนูหลัก">
          <button
            type="button"
            className={page === "overview" ? "active" : ""}
            onClick={() => setPage("overview")}
          >
            ภาพรวม
          </button>

          <button
            type="button"
            className={page === "power" ? "active" : ""}
            onClick={() => setPage("power")}
          >
            กราฟ
          </button>

          <button
            type="button"
            className={page === "system" ? "active" : ""}
            onClick={() => setPage("system")}
          >
            กล้องและระบบ
          </button>

          <button type="button" onClick={onLogout}>
            ออกจากระบบ
          </button>
        </nav>
      </header>

      <h1>ระบบตรวจวัดค่าพารามิเตอร์ภายในเรือ</h1>

      {page === "overview" && (
        <section className="metric-grid">
          {metrics.slice(0, 4).map((item) => (
            <MetricCard key={item.title} item={item} />
          ))}
        </section>
      )}

      {page === "power" && (
        <section className="two-col">
          <MetricCard item={metrics[4]} />
          <ChartCard />
        </section>
      )}

      {page === "system" && <CameraChat />}
    </main>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}