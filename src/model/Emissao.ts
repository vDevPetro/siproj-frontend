type Emissao = {
  id: string;
  num_as: string;
  emissao: number;
  motivo?: string;
  desc_motivo?: string;
  emitir_proj_lb: string;
  emitir_proj_rp?: string;
  emitir_proj_real?: string;
  coment_proj_lb: string;
  coment_proj_rp?: string;
  coment_proj_real?: string;
  atender_coment_proj_lb?: string;
  atender_coment_proj_rp?: string;
  atender_coment_proj_real?: string;
  situacao?: string;
  justificativa?: string;
  log?: string;
}

export default Emissao;