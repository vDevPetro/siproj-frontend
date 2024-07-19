type Usuario = {
    id: string;
    nome: string;
    email: string;
    nivel: string;
    status: string;
    uid: string;
    stamp: string;
    profilePhoto: string;
}

export const nomeAbreviado = (fullName: string): string => {
  const nameParts = fullName.split(' ');

  if (nameParts.length <= 2) {
    return fullName;
  }

  return nameParts
    .map((part, index) => {
      if (
        index === 0 || 
        index === nameParts.length - 1 || 
        part.charAt(0).toLowerCase() === part.charAt(0)
      ) {
        return part;
      } else {
        return `${part.charAt(0)}.`;
      }
    })
    .filter(part => part.charAt(0).toLowerCase() !== part.charAt(0))
    .join(' ');
};

export default Usuario;