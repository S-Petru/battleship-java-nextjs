interface FriendCardProps {
  username: string;
  status: boolean;
}

export default function FriendCard({ username, status }: FriendCardProps) {
  return (
    <main className="text-text-color">
      <div className="flex w-full flex-col gap-0.5 rounded-md bg-primary-color p-1">
        <p>{username}</p>
        <div className="flex gap-1">
          {status ? (
            <div className="flex items-center gap-1 text-center">
              <p className="text-xs">Online</p>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <p className="text-xs">Offline</p>
            </div>
          )}
        </div>
        <div className="flex w-full justify-between">
          <p></p>
        </div>
      </div>
    </main>
  );
}
