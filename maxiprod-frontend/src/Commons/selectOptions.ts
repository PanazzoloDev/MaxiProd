const booleanSelectOptions: { [key: string]: string } = {
    true: 'SIM',
    false: 'NÃO',
}

const categoryTypeDictionary: { [key: string]: string } = {
    1: 'Receita',
    2: 'Despesa',
    3: 'Despesa',
}
const transactionTypeDictionary: { [key: string]: string } = {
    1: 'Receitas',
    2: 'Despesas',
    3: 'Receitas e Despesas',
}

const transactionTypesToSelect = [
    { label: 'Receitas', value: 1 },
    { label: 'Despesas', value: 2 }
]

const categoryTypesToSelect = [
    { label: 'Receitas', value: 1 },
    { label: 'Despesas', value: 2 },
    { label: 'Receitas e Despesas', value: 3 },
]



export {
    booleanSelectOptions,
    categoryTypeDictionary, categoryTypesToSelect, transactionTypeDictionary,
    transactionTypesToSelect
}

