import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown, X as CloseIcon } from 'lucide-react';

function AutoSelect({
  options = [],
  placeholder = 'Sélectionner...',
  onSelect = () => { },
  isMult = false,
  defaultValue = isMult ? [] : null,

  width = '280px',
  border = '1px solid #ccc',
  borderRadius = '6px',
  fontSize = '1rem',
  color = '#333',
  bgColor = 'white',
  inputPadding = '0.4rem 0.6rem',
  listMaxHeight = '160px',
  hoverColor = '#f0f0f0',
  zIndex = 10,
}) {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (isMult) {
      return Array.isArray(defaultValue) ? defaultValue : [];
    } else {
      return defaultValue || null;
    }
  });

  const [inputValue, setInputValue] = useState(() => {
    if (isMult) {
      return '';
    } else {
      return defaultValue?.label || '';
    }
  });

  const [filtered, setFiltered] = useState(options);
  const [showList, setShowList] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setFiltered(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setShowList(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (isMult) {
      if (selectedOptions.some(sel => sel.value === option.value)) {
        const newSelected = selectedOptions.filter(sel => sel.value !== option.value);
        setSelectedOptions(newSelected);
        onSelect(newSelected);
      } else {
        const newSelected = [...selectedOptions, option];
        setSelectedOptions(newSelected);
        onSelect(newSelected);
      }
      setInputValue('');
      setShowList(true);
    } else {
      if (selectedOptions?.value === option.value) {
        setShowList(false);
        return;
      }
      setSelectedOptions(option);
      setInputValue(option.label);
      setShowList(false);
      onSelect(option);
    }
  };

  const handleRemove = (option) => {
    if (!isMult) return;
    const newSelected = selectedOptions.filter(sel => sel.value !== option.value);
    setSelectedOptions(newSelected);
    onSelect(newSelected);
  };

  return (
    <Container $width={width} ref={containerRef}>
      <InputWrapper
        $border={border}
        $borderRadius={borderRadius}
        $padding={inputPadding}
        $bgColor={bgColor}
        $fontSize={fontSize}
        onClick={() => setShowList(prev => !prev)}
      >
        {isMult && selectedOptions.length > 0 && (
          <SelectedTags>
            {selectedOptions.map(option => (
              <Tag key={option.value}>
                {option.label}
                <TagRemove
                  onClick={e => {
                    e.stopPropagation();
                    handleRemove(option);
                  }}
                  aria-label={`Supprimer ${option.label}`}
                >
                  <CloseIcon size={12} />
                </TagRemove>
              </Tag>
            ))}
          </SelectedTags>
        )}
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={isMult && selectedOptions.length > 0 ? '' : placeholder}
          $color={color}
          $fontSize={fontSize}
          readOnly={!isMult}
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-haspopup="listbox"
        />
        <ChevronDown size={18} />
      </InputWrapper>

      {showList && filtered.length > 0 && (
        <List $zIndex={zIndex} $maxHeight={listMaxHeight} role="listbox">
          {filtered.map(option => {
            const isSelected = isMult
              ? selectedOptions.some(sel => sel.value === option.value)
              : selectedOptions?.value === option.value;
            return (
              <ListItem
                key={option.value}
                onClick={() => handleSelect(option)}
                $hoverColor={hoverColor}
                $selected={isSelected}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
              >
                {option.label}
                {isSelected && ' ✓'}
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
}

export default AutoSelect;


const Container = styled.div`
  position: relative;
  width: ${({ $width }) => $width};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  padding: ${({ $padding }) => $padding};
  background: ${({ $bgColor }) => $bgColor};
  cursor: text;
  gap: 0.4rem;
  font-size: ${({ $fontSize }) => $fontSize};
  min-height: 38px;
`;

const SelectedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.div`
  background-color: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
`;

const TagRemove = styled.button`
  background: transparent;
  border: none;
  color: white;
  margin-left: 6px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffdddd;
  }
`;

const Input = styled.input`
  border: none;
  flex: 1;
  min-width: 60px;
  background: transparent;
  outline: none;
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${({ $color }) => $color};
`;

const List = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: ${({ $maxHeight }) => $maxHeight};
  overflow-y: auto;
  z-index: ${({ $zIndex }) => $zIndex};
`;

const ListItem = styled.li`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? '#e6f0ff' : 'transparent')};

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor};
  }
`;
