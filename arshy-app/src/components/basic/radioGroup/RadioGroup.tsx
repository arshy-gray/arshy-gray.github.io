import React, { forwardRef, useState, useEffect } from 'react';
import { StyledRadioGruop } from './StyledRadioGroup';

export interface RadioItemProps {
  label: string;
  value: string | number;
}

export interface RadioboxProps {
  itemType: string;
  legend: string;
  name: string;
  className: string;
  radioItems: RadioItemProps[];
  isAniActive?: boolean;
  checkedVal?: string;
  disabledVal?: string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * ## [Storybook](http://arshy-gray.github.io/?path=/story/components-basic-radiogruop--radio-group)
 *
 * ## Props
 *
 * ---------------------
 *
 * props | type | value | description |
 * :--- | :--- | :--- | :--- |
 * | * itemType | string | default, button | radio 종류 |
 * | * legend | string |  | fieldset 설명 |
 * | * name | string |  | label의 name 속성 |
 * | * className | string |  | fieldset 클래스명 |
 * | * children | [string, string or number] |  | radio 리스트 [label, value] |
 * | isAniActive | boolean |  | 애니메이션 활성화 여부 |
 * | checkedVal | string |  | checked 처리된 input의 value 값 |
 * | disabledVal | string[] |  | disabled 처리된 input의 value 값 리스트 |
 * | onChange | React.ChangeEventHandler<HTMLInputElement> | checkedVal 리스트 셋팅 | onChange 이벤트 |
 */

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioboxProps>(
  (
    {
      itemType,
      legend,
      name,
      className,
      radioItems,
      isAniActive,
      checkedVal,
      disabledVal,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const RadioItems = radioItems as RadioItemProps[];
    const [isChecked, setIsChecked] = useState<string>(checkedVal || '');
    const [isDisabled, setIsDisabled] = useState<string[]>(disabledVal || []);


     const handleItemChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
       const { value } = e.target;
       setIsChecked(value);
       if (onChange) {
         onChange(e);
       }
    };

    // 첫 번째 라디오 버튼이 클릭된 상태로 디폴트 설정
    useEffect(() => {
      if (RadioItems.length > 0 && checkedVal === undefined) {
        setIsChecked(RadioItems[0].value.toString());
      }
    }, [RadioItems, checkedVal]);

    const itemDisabled = () => {
      let disArr = [...isDisabled];

      setIsDisabled(disArr);
    };

    useEffect(() => {
      itemDisabled();
    }, []);

    return (
      <StyledRadioGruop
        $itemLen={RadioItems.length}
        $isAniActive={isAniActive}
        className={[className, 'st_' + itemType].join(' ')}
        ref={ref}
        {...rest}
      >
        <legend>{legend}</legend>

        {RadioItems.map((radioItem, idx) => (
          <label
            key={idx}
            htmlFor={[name, radioItem.value, idx.toString()].join('-').padStart(2, '0')}
            className={'radioItem-' + itemType}
          >
            <input
              type="radio"
              name={name}
              id={[name, radioItem.value, idx.toString()].join('-').padStart(2, '0')}
              value={radioItem.value.toString()}
              checked={isChecked.includes(radioItem.value.toString())}
              disabled={isDisabled.includes(radioItem.value.toString())}
              onChange={(e) => handleItemChecked(e)}
            />
            <span>{radioItem.label}</span>
          </label>
        ))}
      </StyledRadioGruop>
    );
  },
);

export default RadioGroup;
