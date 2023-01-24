import NavigationBar from 'components/NavigationBar';
import VideoBackground from 'components/VideoBackground';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { trpc } from 'utils/trpc';

const ChangePasswordOption: NextPage = () => {
  const passwordInput = useRef<HTMLFormElement>(null);
  const userPassword = trpc.userSettings.passwordCheck.useMutation();
  const [passwordStatus, setPasswordStatus] = useState('');
  const session = useSession();
  const currentPass = passwordInput.current?.elements[0] as HTMLInputElement;
  const newPass = passwordInput.current?.elements[1] as HTMLInputElement;
  const confirmNewPass = passwordInput.current?.elements[2] as HTMLInputElement;

  const handleClick = (ev: React.FormEvent<EventTarget>) => {
    if (
      newPass.value === confirmNewPass.value &&
      currentPass.value.length &&
      confirmNewPass.value.length
    ) {
      const currentPassword: any = {
        currentPassword: currentPass.value,
        newPassword: newPass.value,
        userId: session.data?.user?.id,
      };
      ev.preventDefault();
      userPassword.mutate(currentPassword);
    } else {
      setPasswordStatus('invalid inputs');
    }
  };

  useEffect(() => {
    setPasswordStatus(userPassword.data as any);
  }, [userPassword.data]);

  return (
    <>
      <form
        ref={passwordInput}
        onSubmit={handleClick}
        className="flex flex-col"
      >
        <div className="flex gap-1">
          <input
            className="rounded-md border bg-transparent px-3 py-2"
            type="text"
            placeholder="current password"
          />
          <input className="rounded-md border bg-transparent px-3 py-2" type="text" placeholder="new password" />
          <input className="rounded-md border bg-transparent px-3 py-2" type="text" placeholder=" confirm new password" />
        </div>
        <p test-id="success">{passwordStatus}</p>
        <div className="self-center">
          <button type="submit">change password</button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordOption;
