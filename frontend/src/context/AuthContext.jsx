import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const USER_STORAGE_KEY = "user";
const ACCOUNTS_STORAGE_KEY = "portal_accounts";

const defaultAccounts = [
  {
    id: "demo-student",
    name: "Aarav Sharma",
    email: "student@iitb.ac.in",
    password: "student123",
    role: "Student",
    profession: "Student",
    institute: "IIT Bombay",
    department: "Computer Science",
    phone: "9876543210",
  },
  {
    id: "demo-coordinator",
    name: "Meera Iyer",
    email: "coordinator@fossee.in",
    password: "coord123",
    role: "Coordinator",
    profession: "Faculty Coordinator",
    institute: "FOSSEE, IIT Bombay",
    department: "Workshop Operations",
    phone: "9123456780",
  },
  {
    id: "demo-admin",
    name: "Riya Nair",
    email: "admin@fossee.in",
    password: "admin123",
    role: "Admin",
    profession: "Portal Administrator",
    institute: "FOSSEE, IIT Bombay",
    department: "Administration",
    phone: "9012345678",
  },
];

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const sanitizeUser = (account) => {
  if (!account) {
    return null;
  }

  const { password, ...safeUser } = account;
  return safeUser;
};

const mergeDefaultAccounts = (storedAccounts = []) => {
  const storedByEmail = new Map(
    storedAccounts.map((account) => [account.email?.toLowerCase(), account])
  );

  const mergedDefaults = defaultAccounts.map((account) => {
    const existing = storedByEmail.get(account.email.toLowerCase());
    return existing ? { ...account, ...existing } : account;
  });

  const defaultEmails = new Set(defaultAccounts.map((account) => account.email.toLowerCase()));
  const customAccounts = storedAccounts.filter(
    (account) => !defaultEmails.has(account.email?.toLowerCase())
  );

  return [...mergedDefaults, ...customAccounts];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const storedAccounts = readJson(ACCOUNTS_STORAGE_KEY, []);
    const mergedAccounts = mergeDefaultAccounts(storedAccounts);
    const storedUser = readJson(USER_STORAGE_KEY, null);

    setAccounts(mergedAccounts);
    setUser(storedUser);

    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(mergedAccounts));
  }, []);

  const persistAccounts = (nextAccounts) => {
    setAccounts(nextAccounts);
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(nextAccounts));
  };

  const persistUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const login = (payload) => {
    if (payload?.email && payload?.password) {
      const account = accounts.find(
        (item) =>
          item.email.toLowerCase() === payload.email.toLowerCase() && item.password === payload.password
      );

      if (!account) {
        return { ok: false, message: "Invalid email or password." };
      }

      const safeUser = sanitizeUser(account);
      persistUser(safeUser);
      return { ok: true, user: safeUser };
    }

    const safeUser = sanitizeUser(payload);
    persistUser(safeUser);
    return { ok: true, user: safeUser };
  };

  const registerUser = (payload) => {
    const exists = accounts.some((item) => item.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) {
      return { ok: false, message: "An account with this email already exists." };
    }

    const newAccount = {
      id: `account-${Date.now()}`,
      ...payload,
    };

    const nextAccounts = [...accounts, newAccount];
    persistAccounts(nextAccounts);

    const safeUser = sanitizeUser(newAccount);
    persistUser(safeUser);

    return { ok: true, user: safeUser };
  };

  const createAccount = (payload) => {
    const exists = accounts.some((item) => item.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) {
      return { ok: false, message: "An account with this email already exists." };
    }

    const newAccount = {
      id: `account-${Date.now()}`,
      ...payload,
    };

    const nextAccounts = [...accounts, newAccount];
    persistAccounts(nextAccounts);
    return { ok: true, account: sanitizeUser(newAccount) };
  };

  const removeAccount = (accountId) => {
    const accountToRemove = accounts.find((item) => item.id === accountId);
    if (!accountToRemove) {
      return { ok: false, message: "Account not found." };
    }

    if (user?.id === accountId) {
      return { ok: false, message: "You cannot remove the account you are currently using." };
    }

    const nextAccounts = accounts.filter((item) => item.id !== accountId);
    persistAccounts(nextAccounts);
    return { ok: true, account: sanitizeUser(accountToRemove) };
  };

  const requestPasswordReset = (email) => {
    const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!account) {
      return {
        ok: false,
        message: "We could not find an account with that email address.",
      };
    }

    return {
      ok: true,
      message: `Reset instructions prepared for ${account.email}. In a real backend this would send an email.`,
    };
  };

  const logout = () => {
    persistUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      accounts,
      login,
      logout,
      registerUser,
      createAccount,
      removeAccount,
      requestPasswordReset,
    }),
    [user, accounts]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
