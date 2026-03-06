-- ===========================
-- Base de datos: latencyzero
-- ===========================

CREATE DATABASE IF NOT EXISTS latencyzero;
USE latencyzero;

-- ===========================
-- Tabla: user
-- ===========================
CREATE TABLE IF NOT EXISTS `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user','admin','banned') DEFAULT 'user',
    is_banned BOOLEAN DEFAULT FALSE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================
-- Tabla: sessions
-- ===========================
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    session_name VARCHAR(100) DEFAULT 'Nueva sesión',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_sessions_user_id (user_id),

    CONSTRAINT fk_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES `user`(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================
-- Tabla: chat
-- ===========================
CREATE TABLE IF NOT EXISTS chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    session_id INT NOT NULL,
    user_message VARCHAR(2000) NOT NULL,
    bot_message VARCHAR(4000) NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tools_mode ENUM('llm','ml_model') DEFAULT 'llm',
    bot_files JSON NULL,
    user_files JSON NULL,

    INDEX idx_chat_user_id (user_id),
    INDEX idx_chat_session_id (session_id),

    CONSTRAINT fk_chat_user
        FOREIGN KEY (user_id)
        REFERENCES `user`(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chat_session
        FOREIGN KEY (session_id)
        REFERENCES sessions(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================
-- Tabla: opinions
-- ===========================
CREATE TABLE IF NOT EXISTS opinions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) DEFAULT NULL,
    message VARCHAR(1000) NOT NULL,
    sentiment_label VARCHAR(20) DEFAULT NULL,
    sentiment_score FLOAT DEFAULT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;