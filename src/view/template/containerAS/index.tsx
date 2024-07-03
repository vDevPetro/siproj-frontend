import * as C from './styles';
import { Route, Routes, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AtualizarAS from '../../pages/asatualizadados';
import InserirEmissao from '../../pages/emissoesinserir';
import NavLink from './NavLink';

const ContainerAS = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <C.Container id="main" className="main">
        <div className="card px-2 py-1 py-md-4">
            <div className="card-body">
                <Nav fill variant="tabs" defaultActiveKey={`/as/${id}/atualizar`}>
                    <Nav.Item>
                        <NavLink to={`/as/${id}/atualizar`}>Base</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to={`/as/${id}/cronograma`}>Cronograma</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to={`/as/${id}/historico`}>Histórico</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to={`/as/${id}/emissoes`}>Emissões</NavLink>
                    </Nav.Item>
                </Nav>

                <Routes>
                    <Route path="atualizar" element={<AtualizarAS />} />
                    <Route path="cronograma" element={<div>Cronograma Component</div>} />
                    <Route path="historico" element={<div>Histórico Component</div>} />
                    <Route path="emissoes" element={<InserirEmissao/>} />
                </Routes>
            </div>
        </div>
    </C.Container>
  );
};

export default ContainerAS;
