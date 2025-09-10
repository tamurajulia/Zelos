import "./novo.css"

export default function NovoChamado() {
  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
      <h2 className="mb-0 me-2" style={{ color: "#225299" }}>Novo chamado</h2>

        <i className="bi bi-caret-down-fill fs-5" style={{ color: "#225299" }}></i>
      </div>

      
        <div className="card shadow-sm" style={{ border: '1px solid #d9d9d9' }}>
          <div className="card-body">

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="numPatrimonio" className="form-label">Titulo</label>
                <input type="text" className="form-control" id="numPatrimonio" placeholder="Ex: Computador quebrado"/>
              </div>
              <div className="col-md-6">
                <label htmlFor="localizacao" className="form-label">Tipo de chamado</label>
                <input type="text" className="form-control" id="localizacao"  placeholder="Ex: Manutenção"/>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="numPatrimonio" className="form-label">Número do patrimônio</label>
                <input type="text" className="form-control" id="numPatrimonio" placeholder="Ex: 123134212"/>
              </div>
              <div className="col-md-6">
                <label htmlFor="localizacao" className="form-label">Localização</label>
                <input type="text" className="form-control" id="localizacao" placeholder="Ex: Bloco A"/>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="tipoPatrimonio" className="form-label">Tipo de patrimônio</label>
                <input type="text" className="form-control" id="tipoPatrimonio" placeholder="Ex: Computador"/>
              </div>
              <div className="col-md-6">
                <label className="form-label d-block">Prioridade</label>
                <div className="d-flex flex-wrap">
                  <div className="form-check me-4">
                    <input className="form-check-input" type="radio" name="prioridade" id="prioridadeBaixa" value="baixa" defaultChecked />
                    <label className="form-check-label" htmlFor="prioridadeBaixa">Baixa</label>
                  </div>
                  <div className="form-check me-4">
                    <input className="form-check-input" type="radio" name="prioridade" id="prioridadeMedia" value="media" />
                    <label className="form-check-label" htmlFor="prioridadeMedia">Média</label>
                  </div>
                  <div className="form-check me-4">
                    <input className="form-check-input" type="radio" name="prioridade" id="prioridadeAlta" value="alta" />
                    <label className="form-check-label" htmlFor="prioridadeAlta">Alta</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="prioridade" id="prioridadeUrgente" value="urgente" />
                    <label className="form-check-label" htmlFor="prioridadeUrgente">Urgente</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição</label>
              <textarea className="form-control" id="descricao" rows="4"></textarea>
            </div>
            
            <hr />

            <div className="mb-4">
              <label htmlFor="anexarArquivos" className="form-label">Anexe fotos ou arquivos</label>
              <p className="text-muted small">Faça upload de até 10 arquivos aceitos: PDF ou image. O tamanho máximo é de 10 MB por item.</p>
              <div className="border border-secondary p-4 text-center rounded">
                <p className="mb-2">Arraste e solte arquivos aqui</p>
                <button type="button" className="btn btn-primary">
                  Anexar arquivo <i className="bi bi-download"></i>
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Enviar chamado
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}