type Emissao = {
  id: string;
  num_as: string;
  emissao: number;
  motivo?: string;
  desc_motivo?: string;
  emitir_projeto_lb: string;
  emitir_proj_rp?: string;
  emitir_proj_real?: string;
  comentar_projeto_lb: string;
  coment_proj_rp?: string;
  coment_proj_real?: string;
  atender_coment_proj_lb?: string;
  atender_coment_proj_rp?: string;
  atender_coment_proj_real?: string;
  flag_aprov?: boolean;
  flag_aprov_coment?: boolean;
  flag_reprov?: boolean;
  justificativa?: string;
  log?: string;
}

export default Emissao;