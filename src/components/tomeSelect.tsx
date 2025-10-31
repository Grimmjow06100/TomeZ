import Select from 'react-select';
import { StylesConfig } from 'react-select';
import {TomeOption} from '@/types/interface.js';
import { SingleValue, ActionMeta } from 'react-select';

const TomeSelect = ({ totalTomes, selectedTome, handleTomeChange }:{
    totalTomes:number,
    selectedTome:number,
    handleTomeChange: ( 
        newValue: SingleValue<TomeOption>,
        actionMeta: ActionMeta<TomeOption> 
        ) => void
    }) => {
  // Génération des options à partir du nombre total de tomes
  const options = totalTomes
    ? Array.from({ length: totalTomes }, (_, index) => ({
        value: index + 1,
        label: `Tome ${index + 1}`,
      }))
    : [];
  

  // Style personnalisé (blanc sur fond noir transparent)
  const customStyles :  StylesConfig<TomeOption, false> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor:'transparent',
      boxShadow: 'none',
      '&:hover': { borderColor: '#fff' },
      color: 'white',
      fontSize: '1.1rem',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      borderRadius: '0.5rem',
      overflow: 'hidden',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? 'white'
        : 'transparent',
      color: state.isFocused ? 'black' : 'white',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: 'white',
      '&:hover': { color: '#ccc' },
    }),
  };

  return (
    <>
      <Select
        aria-label="Tome Selection"
        value={options.find((o) => o.value === selectedTome)}
        onChange={handleTomeChange}
        options={options}
        styles={customStyles}
        isSearchable={false}
        className="w-full"
      />
    </>
  );
};

export default TomeSelect;
