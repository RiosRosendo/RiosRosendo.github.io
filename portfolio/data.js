/* Portfolio content - Rosendo De Los Rios Moreno */
window.PORTFOLIO = {
  name: "Rosendo De Los Rios Moreno",
  github: "https://github.com/RiosRosendo",
  githubUser: "RiosRosendo",
  linkedin: "https://www.linkedin.com/in/delosriosrosendo",
  email: "delosriosrosendo@gmail.com",
  cvFile: { es: "portfolio/docs/Rosendo_CV_ES.pdf", en: "portfolio/docs/Rosendo_CV_EN.pdf" },
  photo: "portfolio/rosendo.jpeg",

  skills: [
    {
      es: "Robótica & Control", en: "Robotics & Control",
      items: [
        { es: "ROS2 / Nav2", en: "ROS2 / Nav2" },
        { es: "SLAM", en: "SLAM" },
        { es: "Localización Monte Carlo", en: "Monte Carlo Localization" },
        { es: "Cinemática Inversa", en: "Inverse Kinematics" },
        { es: "Control PID", en: "PID Control" },
        { es: "Teleoperación", en: "Teleoperation" },
        { es: "LiDAR", en: "LiDAR" },
        { es: "UAV / Drones", en: "UAV / Drones" },
        { es: "FreeRTOS", en: "FreeRTOS" },
        { es: "Navegación Autónoma", en: "Autonomous Navigation" }
      ]
    },
    {
      es: "Simulación & Percepción", en: "Simulation & Perception",
      items: [
        { es: "Gazebo", en: "Gazebo" },
        { es: "Isaac Sim", en: "Isaac Sim" },
        { es: "OpenCV", en: "OpenCV" },
        { es: "SUSAN / Canny / Sobel", en: "SUSAN / Canny / Sobel" },
        { es: "MediaPipe", en: "MediaPipe" },
        { es: "Open3D", en: "Open3D" },
        { es: "RealSense", en: "RealSense" },
        { es: "Kinect v2", en: "Kinect v2" },
        { es: "TSDF / ESDF", en: "TSDF / ESDF" },
        { es: "Nubes de Puntos", en: "Point Clouds" }
      ]
    },
    {
      es: "Sistemas Embebidos", en: "Embedded Systems",
      items: [
        { es: "STM32 (F103 / H755)", en: "STM32 (F103 / H755)" },
        { es: "C / C++", en: "C / C++" },
        { es: "CAN / SPI / UART / I2C", en: "CAN / SPI / UART / I2C" },
        { es: "Arduino / ESP32", en: "Arduino / ESP32" },
        { es: "Raspberry Pi", en: "Raspberry Pi" },
        { es: "Diseño PCB", en: "PCB Design" },
        { es: "FPGA / VHDL", en: "FPGA / VHDL" },
        { es: "Quartus", en: "Quartus" },
        { es: "Comunicación Serial", en: "Serial Communication" },
        { es: "IMU", en: "IMU" }
      ]
    },
    {
      es: "Software & Herramientas", en: "Software & Tools",
      items: [
        { es: "Python", en: "Python" },
        { es: "MATLAB", en: "MATLAB" },
        { es: "HTML / CSS", en: "HTML / CSS" },
        { es: "C#", en: "C#" },
        { es: "Unity", en: "Unity" },
        { es: "Processing", en: "Processing" },
        { es: "Linux", en: "Linux" },
        { es: "Git / GitHub", en: "Git / GitHub" },
        { es: "Firebase / IoT", en: "Firebase / IoT" }
      ]
    }
  ],

  projects: [
    {
      year: "2026", index: "01",
      image: "portfolio/img/aist.png",
      video: "", // ← ej: "https://youtu.be/XXXXXXX" o "https://youtube.com/watch?v=XXXXXXX"
      tag_es: "Pasantía · AIST Japón", tag_en: "Internship · AIST Japan",
      title: { es: "Brazo Robótico de Teleoperación Consciente de Ocupación", en: "Teleoperated Occupancy-Aware Robot Arm" },
      es: "Sistema de teleoperación para ambientes de retail desarrollado en AIST Japón. Integra percepción RGB-D con Intel RealSense, voxelización TSDF/ESDF en ROS2 y una interfaz en Unity vía OpenHRC. Reduce la carga cognitiva del operador mostrando el entorno como volúmenes de ocupación en lugar de video crudo.",
      en: "Teleoperation system for retail manipulation built at AIST Japan. Integrates RGB-D perception (RealSense), TSDF/ESDF voxelization in ROS2, and a Unity interface via OpenHRC. Reduces cognitive load by representing the scene as occupancy voxels instead of raw video.",
      stack: ["ROS2", "RealSense D435i", "Unity", "TSDF/ESDF", "OpenHRC", "Python"],
      repo: "",
      paper: "docs/Final_Report_A01198515.pdf",
      video: ""
    },
    {
      year: "2025", index: "02",
      image: "portfolio/img/line.png",
      tag_es: "Autónomo · Manchester Robotics", tag_en: "Autonomous · Manchester Robotics",
      title: { es: "Reto Autónomo PuzzleBot", en: "Autonomous PuzzleBot Challenge" },
      es: "Robot autónomo que navega por un track en forma de 'B' con detección de señales de tráfico en tiempo real. Integra ROS2 en NVIDIA Jetson, YOLO para visión, line following con PID y máquina de estados (Pytrees) para comportamiento inteligente. Participé en testing exhaustivo y optimización de performance en vivo, logrando 92.4% de precisión en seguimiento de línea.",
      en: "Autonomous robot navigating a 'B'-shaped track with real-time traffic sign detection. Integrates ROS2 on NVIDIA Jetson, YOLO for vision, PID-controlled line following, and state machine (Pytrees) for intelligent behavior. I contributed testing and live performance optimization, achieving 92.4% line tracking accuracy at 1m 50s lap times.",
      stack: ["ROS2", "NVIDIA Jetson", "YOLO", "OpenCV", "PID Control", "Pytrees", "Line Following", "Python"],
      repo: "",
      paper: "",
      video: "https://youtu.be/vReOwyVuvZk?si=J_wOPwuDw6yQ8w4g"
    },
    {
      year: "2025", index: "03",
      image: "portfolio/img/silla.png",
      tag_es: "Robótica móvil · Social", tag_en: "Mobile robotics · Social",
      title: { es: "Navegación de Silla de Ruedas Autónoma", en: "Autonomous Wheelchair Navigation" },
      es: "Prototipo de silla de ruedas autónoma con ROS2 Humble, SLAM y Nav2 usando LiDAR RPLiDAR A1. Mapeo de campus universitario para asistencia de movilidad a personas con discapacidad motora en espacios públicos grandes.",
      en: "Autonomous wheelchair prototype with ROS2 Humble, SLAM and Nav2 using RPLiDAR A1. University campus mapping for mobility assistance for people with motor disabilities in large public spaces.",
      stack: ["ROS2", "Nav2", "SLAM", "RPLiDAR A1", "Python", "Differential Drive"],
      repo: "",
      paper: "docs/Autonomous_mobility_for_people_with_different_needs.pdf",
      video: ""
    },
    {
      year: "2025", index: "04",
      image: "portfolio/img/xarm_kinect.png",
      tag_es: "Visión 3D · Industrial", tag_en: "3D Vision · Industrial",
      title: { es: "Seguimiento de Bandeja de Aceite con xArm + Kinect v2", en: "xArm + Kinect v2 Oil Pan Tracking" },
      es: "Pipeline de percepción 3D en ROS2 para seguimiento y manipulación industrial de piezas (oil pan). Filtrado de nube de puntos con Open3D, alineación ICP con modelo CAD, estimación de pose y control del brazo xArm. Precisión de 2.8 cm y latencia de 450 ms.",
      en: "ROS2 3D perception pipeline for industrial oil pan tracking and manipulation. Point cloud filtering with Open3D, ICP alignment with CAD model, pose estimation and xArm control. 2.8 cm accuracy at 450 ms latency.",
      stack: ["ROS2", "Kinect v2", "xArm", "Open3D", "ICP", "Python"],
      repo: "https://github.com/RiosRosendo/xarm-kinect-oil-pan-tracking",
      paper: "docs/xarm_kinect_paper.pdf",
      video: "https://youtu.be/UcO9PaDF4hk"
    },
    {
      year: "2025", index: "05",
      image: "portfolio/img/Teleoperation via Body Pose.png",
      tag_es: "Teleoperación · CV", tag_en: "Teleoperation · CV",
      title: { es: "Teleoperación de Brazo de 3 GDL por Pose Corporal", en: "3-DOF Arm Teleoperation via Body Pose" },
      es: "Teleoperación de brazo robótico de 3 GDL controlado únicamente con una cámara. MediaPipe detecta puntos clave de mano y cuerpo, calcula ángulos articulares y los transmite a una simulación 3D en Processing en tiempo real.",
      en: "3-DOF robotic arm teleoperation using only a conventional camera. MediaPipe detects hand and body keypoints, computes joint angles, and transmits them to a real-time 3D Processing simulation.",
      stack: ["Python", "MediaPipe", "OpenCV", "Processing", "Logitech C920"],
      repo: "https://github.com/RiosRosendo/3dof-arm-teleoperation",
      paper: "docs/miniarm_3dof_teleoperation.pdf",
      video: "https://youtu.be/rwZ0-BKw0KM"
    },
    {
      year: "2024", index: "06",
      image: "portfolio/img/UAV.png",
      tag_es: "Robótica aérea · UAV", tag_en: "Aerial robotics · UAV",
      title: { es: "Dron de Patrulla Autónomo — Tello Robomaster TT", en: "Autonomous Patrol Drone — Tello Robomaster TT" },
      es: "Dron de patrullaje autónomo en perímetro cuadrado de 2×2 m con detección de intrusos por visión artificial. Al detectar una persona a menos de 1 metro se detiene y activa señales de alerta. Integra cinemática de cuadrotor y control de vuelo.",
      en: "Autonomous patrol drone on a 2×2 m square perimeter with intruder detection via computer vision. Stops and triggers alerts when a person is within 1 meter. Integrates quadrotor kinematics and flight control.",
      stack: ["Python", "OpenCV", "Tello SDK", "YOLO / CV", "UAV Control"],
      repo: "https://github.com/RiosRosendo/autonomous-patrol-drone",
      paper: "",
      video: "https://youtube.com/shorts/scqwJ-qq8m8"
    },
    {
      year: "2024", index: "08",
      image: "portfolio/img/autonomus_tractor.png",
      tag_es: "Embebidos · John Deere", tag_en: "Embedded · John Deere",
      title: { es: "Tractor Autónomo — John Deere (FreeRTOS)", en: "Autonomous Tractor — John Deere (FreeRTOS)" },
      es: "Prototipo de tractor autónomo en escala en colaboración con John Deere. Navegación por waypoints con STM32H755 dual-core, FreeRTOS, IMU, encoders y protocolos CAN/SPI/UART. Modelo V para verificación y pruebas unitarias de motor y servo.",
      en: "Scale autonomous tractor in collaboration with John Deere. Waypoint navigation with STM32H755 dual-core, FreeRTOS, IMU, encoders and CAN/SPI/UART protocols. V-model for verification and unit testing of motor and servo subsystems.",
      stack: ["STM32H755", "FreeRTOS", "CAN / SPI / UART", "IMU", "C", "NRF24"],
      repo: "https://github.com/RiosRosendo/autonomous-tractor-freertos",
      paper: "docs/Autonomous_Tractor_Report.pdf",
      video: "https://youtube.com/shorts/E_u5Upr1cHg"
    },
    {
      year: "2024", index: "09",
      image: "portfolio/img/Smart Tractor.png",
      tag_es: "Embebidos · John Deere", tag_en: "Embedded · John Deere",
      title: { es: "Monitor Inteligente de Tractor — John Deere (STM32 + RPi)", en: "Smart Tractor Monitor — John Deere (STM32 + RPi)" },
      es: "Sistema inteligente de conducción para tractor en colaboración con John Deere. STM32F103 mide velocidad del motor con acelerómetro, gestiona marchas y envía datos vía FTDI a una Raspberry Pi que grafica parámetros en tiempo real con Python.",
      en: "Smart tractor driving system in collaboration with John Deere. STM32F103 measures motor speed with an accelerometer, manages gear changes and sends data via FTDI to a Raspberry Pi that plots parameters in real time with Python.",
      stack: ["STM32F103", "Raspberry Pi", "FTDI", "Python", "RTOS", "Accelerometer"],
      repo: "",
      paper: "docs/smart_tractor_monitor_report.pdf",
      video: "https://youtu.be/KAS2QKjcCOs"
    },
    {
      year: "2023", index: "10",
      image: "portfolio/img/simuladortractor.png",
      tag_es: "FPGA · Sistemas en Chip", tag_en: "FPGA · System on Chip",
      title: { es: "Simulador de Tractor — FPGA + Unity", en: "Tractor Simulator — FPGA + Unity" },
      es: "Simulador de tractor agrícola en Unity controlado por FPGA DE10-Lite. Implementa lógica de control en PLD (VHDL) para interpretar botones, switches y acelerómetro. Muestra datos en tiempo real (contador de cosecha, velocidad) mediante conexión serial. Proyecto de sistemas embebidos integrado hardware-software.",
      en: "Agricultural tractor simulator in Unity controlled by FPGA DE10-Lite. Implements control logic in PLD (VHDL) to interpret buttons, switches and accelerometer. Displays real-time data (harvest counter, speed) via serial connection. Integrated hardware-software embedded systems project.",
      stack: ["FPGA", "VHDL", "Quartus", "Unity", "C#", "Serial Communication", "Accelerometer"],
      repo: "https://github.com/RiosRosendo/tractor-simulator-fpga-unity",
      paper: "docs/Tractor_Simulator_Report.pdf",
      video: "https://www.youtube.com/watch?v=Fu5qLoS_6Co"
    },
    {
      year: "2023", index: "11",
      image: "portfolio/img/greenwatertech.png",
      tag_es: "IoT · Sostenibilidad", tag_en: "IoT · Sustainability",
      title: { es: "GreenWaterTech — IoT de Riego Inteligente", en: "GreenWaterTech — Smart Irrigation IoT" },
      es: "Plataforma IoT para optimizar el riego agrícola con sensores de humedad y temperatura del suelo, Firebase Realtime Database, algoritmos de control inteligente y dashboard web en Next.js con interfaz móvil. Alineado con ODS 11 y 12.",
      en: "IoT platform to optimize agricultural irrigation using soil humidity and temperature sensors, Firebase Realtime Database, smart control algorithms, and a Next.js web dashboard with mobile interface. Aligned with SDGs 11 and 12.",
      stack: ["IoT", "Firebase", "Next.js", "ESP32", "Sensors", "Python"],
      repo: "https://github.com/CarlosMtz1281/GreenWaterTech-Client",
      paper: "",
      video: ""
    }
  ],

  t: {
    es: {
      navAbout: "Sobre mí", navWork: "Proyectos", navSkills: "Habilidades", navContact: "Contacto",
      role: "Ingeniero en Robótica y Sistemas Digitales",
      heroBadge: "DISPONIBLE PARA COLABORAR",
      heroTitle1: "Trabajando en el presente", heroTitle2: "enfocado en el futuro",
      heroSub: "Robótica, sistemas embebidos e inteligencia artificial. Diseño hardware y software que conecta el mundo físico con el digital.",
      ctaWork: "Ver proyectos", ctaContact: "Contáctame",
      enter: "ENTRAR",
      aboutKicker: "01 — SOBRE MÍ",
      aboutTitle: "Donde el código\ntoca el mundo físico",
      aboutBody: "Soy estudiante de Ingeniería en Robótica y Sistemas Digitales en el Tec de Monterrey. He colaborado con John Deere en sistemas embebidos autónomos y realicé una pasantía de investigación en AIST Japón desarrollando interfaces de teleoperación para robots manipuladores.\n\nTrabajo en la intersección entre hardware y software: desde firmware con FreeRTOS hasta percepción 3D, SLAM y visión por computadora — siempre con prototipos funcionales como resultado.",
      stat1: "Proyectos", stat2: "Años de experiencia", stat3: "Tecnologías",
      workKicker: "02 — PROYECTOS",
      workTitle: "Trabajos seleccionados",
      workSub: "Proyectos académicos, industriales y de investigación. Más repositorios en mi GitHub.",
      viewRepo: "Ver repositorio",
      skillsKicker: "03 — HABILIDADES",
      skillsTitle: "Stack técnico",
      skillsSub: "Las herramientas con las que diseño y construyo.",
      cvKicker: "04 — CURRÍCULUM",
      cvTitle: "Descarga mi CV",
      cvBody: "Mi trayectoria completa, formación y experiencia en un solo documento.",
      cvBtn: "Descargar CV (PDF)",
      cvNote: "Aún no se ha cargado el CV — súbelo y lo enlazo aquí.",
      contactKicker: "05 — CONTACTO",
      contactTitle: "Trabajemos\njuntos",
      contactBody: "¿Tienes un proyecto de robótica, automatización o sistemas embebidos? Hablemos.",
      contactEmail: "Escríbeme",
      footer: "Diseñado y construido con precisión.",
      replay: "Repetir intro"
    },
    en: {
      navAbout: "About", navWork: "Work", navSkills: "Skills", navContact: "Contact",
      role: "Robotics & Digital Systems Engineer",
      heroBadge: "AVAILABLE FOR COLLABORATION",
      heroTitle1: "Working in the present", heroTitle2: "focused on the future",
      heroSub: "Robotics, embedded systems and artificial intelligence. I design hardware and software that connects the physical world with the digital one.",
      ctaWork: "View work", ctaContact: "Get in touch",
      enter: "ENTER",
      aboutKicker: "01 — ABOUT",
      aboutTitle: "Where code\nmeets the physical world",
      aboutBody: "I'm a Robotics and Digital Systems Engineering student at Tec de Monterrey. I collaborated with John Deere on autonomous embedded systems and completed a research internship at AIST Japan building teleoperation interfaces for robotic manipulators.\n\nI work at the intersection of hardware and software — from FreeRTOS firmware to 3D perception, SLAM and computer vision — always delivering functional prototypes.",
      stat1: "Projects", stat2: "Years of experience", stat3: "Technologies",
      workKicker: "02 — WORK",
      workTitle: "Selected projects",
      workSub: "Academic, industrial and research projects. More repos on my GitHub.",
      viewRepo: "View repository",
      skillsKicker: "03 — SKILLS",
      skillsTitle: "Technical stack",
      skillsSub: "The tools I design and build with.",
      cvKicker: "04 — RÉSUMÉ",
      cvTitle: "Download my CV",
      cvBody: "My full background, education and experience in a single document.",
      cvBtn: "Download CV (PDF)",
      cvNote: "No CV uploaded yet — add it and I'll link it here.",
      contactKicker: "05 — CONTACT",
      contactTitle: "Let's work\ntogether",
      contactBody: "Got a robotics, automation or embedded systems project? Let's talk.",
      contactEmail: "Email me",
      footer: "Designed and built with precision.",
      replay: "Replay intro"
    }
  }
};
