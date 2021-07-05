import Dialog from '@app/components/Dialog';
import useSettings from '@app/features/useSettings';
import React from 'react';
import shallow from 'zustand/shallow';

const Settings = () => {
  const [gasless] = useSettings(state => [state.gasless], shallow);
  return (
    <Dialog title="Settings">
      <div className="form-item">
        <label>Gasless</label>
        <input
          type="checkbox"
          checked={gasless}
          onChange={() => useSettings.getState().toggleGasless()}
        />
      </div>
    </Dialog>
  );
};

export default Settings;
