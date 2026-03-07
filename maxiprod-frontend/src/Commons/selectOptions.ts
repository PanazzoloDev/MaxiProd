const booleanSelectOptions: { [key: string]: string } = {
    true: 'SIM',
    false: 'NÃO',
}

const categoryTypeSelectOptions: { [key: string]: string } = {
    1: 'Receita',
    2: 'Despesa',
}

const transactionTypesToSelect = [
    { label: 'Receitas', value: 1 },
    { label: 'Despesas', value: 2 }
]


export {
    booleanSelectOptions,
    categoryTypeSelectOptions,
    transactionTypesToSelect
}

