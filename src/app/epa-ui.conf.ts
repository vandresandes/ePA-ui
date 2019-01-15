export const epaUiConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    {label: 'MENU', separator: true},
    {label: 'Dashboard', route: 'dashboard', iconClasses: 'fa fa-tasks'},

    {label: 'Administrador', separator: true},
    {label: 'Núcleo', route: 'nucleo/pesquisa', iconClasses: 'fa fa-tasks'},
    {label: 'Tipo de Processo', route: 'tipoprocesso/pesquisa', iconClasses: 'fa fa-tasks'},
    {label: 'Termo Geral', route: 'termogeral/pesquisa', iconClasses: 'fa fa-tasks'},
    {label: 'Termo Específico', route: 'termoespecifico/pesquisa', iconClasses: 'fa fa-tasks'},
    {label: 'Documento', route: 'documento/pesquisa', iconClasses: 'fa fa-file'},
    {label: 'Checklist', route: 'checklist/pesquisa', iconClasses: 'fa fa-tasks'},

    {label: 'Processos', separator: true},
    {label: 'Ingresso de Processos', route: 'ingresso-processos', iconClasses: 'fa fa-tasks'}
    /*
    {label: 'Checklist de Informações Requeridas', route: 'checklist-informacoes-requeridas', iconClasses: 'fa fa-tasks'},
    {label: 'Verificação', route: 'verificacao', iconClasses: 'fa fa-tasks'},
    {label: 'Impressão do Resultado', route: 'impressao-resultado', iconClasses: 'fa fa-tasks'}
    */
  ]
};
