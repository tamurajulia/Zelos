create database zelos;
   use zelos;
   
   -- Criação da tabela usuarios
    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        numeroRegistro int not null,
        nome VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        funcao VARCHAR(100) NOT NULL,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        
    );

    -- Criação da tabela pool
    CREATE TABLE pool (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL,
        descricao TEXT,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (created_by) REFERENCES usuarios(id),
        FOREIGN KEY (updated_by) REFERENCES usuarios(id)
    );

    -- Criação da tabela chamados
    CREATE TABLE chamados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        patrimonio TEXT NOT NULL,
        localizacao VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        grauPrioridade int not null,
        arquivos varchar(400),
        tipo_id INT,
        tecnico_id INT,
        usuario_id INT,
        status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (tipo_id) REFERENCES pool(id),
        FOREIGN KEY (tecnico_id) REFERENCES usuarios(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );

    -- Criação da tabela apontamentos
CREATE TABLE apontamentos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	chamado_id INT NOT NULL,
	tecnico_id INT,
    usuario_id INT,
    admin_id INT,
	descricao TEXT,
    pecasUtilizadas TEXT,
    arquivos text,
	comeco TIMESTAMP NOT NULL,
	fim TIMESTAMP NULL,
	duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED,
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (chamado_id) REFERENCES chamados(id),
	FOREIGN KEY (tecnico_id) REFERENCES usuarios(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
    -- Criação da tabela pool_tecnico
    CREATE TABLE pool_tecnico (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_pool INT,
        id_tecnico INT,
        FOREIGN KEY (id_pool) REFERENCES pool(id),
        FOREIGN KEY (id_tecnico) REFERENCES usuarios(id)
    );
    

    
    CREATE TABLE equipamentos (
    PATRIMONIO INT PRIMARY KEY,              
    SALA VARCHAR(100) NOT NULL,             
    EQUIPAMENTO VARCHAR(255) NOT NULL,      
    STATUS ENUM('ativo','inativo') DEFAULT 'ativo', 
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


    -- Índices adicionais para otimização
    CREATE INDEX idx_usuarios_email ON usuarios(email);
    CREATE INDEX idx_chamados_status ON chamados(status);
    CREATE INDEX idx_apontamentos_comeco_fim ON apontamentos(comeco, fim);