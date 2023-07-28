import React, { forwardRef, useState, useEffect } from 'react';
import { StyledChkGruop } from './StyledChkGroup';

export interface ChkItemProps {
  label: string;
  value: string | number;
}

export interface CheckboxProps {
  itemType: string;
  legend: string;
  name: string;
  className: string;
  chkItems: ChkItemProps[];
  isAniActive?: boolean;
  checkedVal?: string[];
  disabledVal?: string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * ## [Storybook](http://arshy-gray.github.io/?path=/story/components-basic-checkboxgroup--checkbox-group)
 *
 * ## Props
 *
 * ---------------------
 *
 * | props | type | value | description |
 * | :--- | :--- | :--- | :--- |
 * | * itemType | string | default | checkbox 종류 |
 * | * legend | string |  | fieldset 설명 |
 * | * name | string |  | label의 name 속성 |
 * | * className | string |  | fieldset 클래스명 |
 * | * children | [string, string or number] |  | checkbox 리스트 [label, value] |
 * | isAniActive | boolean |  | 애니메이션 활성화 여부 |
 * | checkedVal | string[] |  | checked 처리된 input의 value 값 리스트 |
 * | disabledVal | string[] |  | disabled 처리된 input의 value 값 리스트 |
 * | onChange | React.ChangeEventHandler<HTMLInputElement> | checkedVal 리스트 셋팅 | onChange 이벤트 |
 */

const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxProps>(
  (
    {
      itemType,
      legend,
      name,
      className,
      chkItems,
      isAniActive,
      checkedVal,
      disabledVal,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const ChkItems = chkItems as ChkItemProps[];
    const [isChecked, setIsChecked] = useState<string[]>(checkedVal || []);
    const [isDisabled, setIsDisabled] = useState<string[]>(disabledVal || []);

    const handleItemChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const updatedCheckedVal = e.target.checked
        ? [...isChecked, e.target.value]
        : isChecked.filter((value) => value !== e.target.value);

      setIsChecked(updatedCheckedVal);
    };

    const itemDisabled = () => {
      let disArr = [...isDisabled];

      setIsDisabled(disArr);
    };

    useEffect(() => {
      itemDisabled();
    }, []);

    return (
      <StyledChkGruop
        $itemLen={ChkItems.length}
        $isAniActive={isAniActive}
        className={[className, 'st_' + itemType].join(' ')}
        ref={ref}
        {...rest}
      >
        <legend>{legend}</legend>

        {ChkItems.map((chkItem, idx) => (
          <label
            key={idx}
            htmlFor={[name, chkItem.value, idx.toString()].join('-').padStart(2, '0')}
            className={'chkItem-' + itemType}
          >
            <input
              type="checkbox"
              name={name}
              id={[name, chkItem.value, idx.toString()].join('-').padStart(2, '0')}
              value={chkItem.value.toString()}
              checked={isChecked.includes(chkItem.value.toString())}
              disabled={isDisabled.includes(chkItem.value.toString())}
              onChange={(e) => handleItemChecked(e)}
            />
            <span>{chkItem.label}</span>
          </label>
        ))}
      </StyledChkGruop>
    );
  },
);

export default CheckboxGroup;
