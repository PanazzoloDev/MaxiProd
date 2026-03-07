interface CurrencyConverterProps {
  value: number
  currency?: 'BRL' | 'USD'
}

const CurrencyConverter = (props: CurrencyConverterProps) => {

  function formatToBRL(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
  }

  const convertedDate = formatToBRL(props.value);
  return convertedDate
  ;
};

export {CurrencyConverter};