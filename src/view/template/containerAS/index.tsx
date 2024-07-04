import * as C from './styles';
import { Route, Routes, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AtualizarAS from '../../pages/asatualizadados';
import Emissao from '../../pages/emissoes';
import NavLink from './NavLink';
import Cronograma from '../../pages/cronograma';

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
                    <Route path="cronograma" element={<Cronograma/>} />
                    <Route path="historico" element={<div>Histórico Component</div>} />
                    <Route path="emissoes" element={<Emissao/>} />
                </Routes>
            </div>
        </div>
    </C.Container>
  );
};

export default ContainerAS;
