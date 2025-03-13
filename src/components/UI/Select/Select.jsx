import styles from "./styles.module.css";

const Select = ({ defaultValue, options, onChange }) => {
  console.log('select rendered', defaultValue);
  
  return (
    <select defaultValue={defaultValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
