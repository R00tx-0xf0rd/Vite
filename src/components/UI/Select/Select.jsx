import styles from "./styles.module.css";

const Select = ({ defaultValue, options, onChange, label="Выберите значение" }) => {
  return (
    <div className={styles.wrap}>
      <label>{label}</label>
      <select defaultValue={defaultValue} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
