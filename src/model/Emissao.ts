type Emissao = {
  id: number;
  num_as: string;
  num_emissao: number;
  motivo?: string;
  desc_motivo?: string;
  emitir_proj_lb: number;
  emitir_proj_rp?: number;
  emitir_proj_real?: number;
  coment_proj_lb: number;
  coment_proj_rp?: number;
  coment_proj_real?: number;
  atender_coment_proj_lb?: number;
  atender_coment_proj_rp?: number;
  atender_coment_proj_real?: number;
  flag_aprov?: boolean;
  flag_aprov_coment?: boolean;
  flag_reprov?: boolean;
  justificativa?: string;
  log?: string;
}

export default Emissao;