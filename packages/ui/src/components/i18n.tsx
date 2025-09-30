'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Locale = 'en' | 'zh' | 'es' | 'fr' | 'de'

interface Translations {
  [key: string]: string | Translations
}

const translations: Record<Locale, Translations> = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      search: 'Search',
      filter: 'Filter',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information'
    },
    navigation: {
      home: 'Home',
      dashboard: 'Dashboard',
      orders: 'Orders',
      fleet: 'Fleet',
      reports: 'Reports',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout'
    },
    orders: {
      title: 'Orders',
      createOrder: 'Create Order',
      orderId: 'Order ID',
      customer: 'Customer',
      status: 'Status',
      mode: 'Delivery Mode',
      createdAt: 'Created At',
      actions: 'Actions',
      view: 'View',
      track: 'Track',
      assign: 'Assign',
      cancel: 'Cancel'
    },
    fleet: {
      title: 'Fleet',
      asset: 'Asset',
      type: 'Type',
      battery: 'Battery',
      status: 'Status',
      lastSeen: 'Last Seen',
      actions: 'Actions',
      track: 'Track',
      maintain: 'Maintain'
    },
    status: {
      created: 'Created',
      dispatched: 'Dispatched',
      inTransit: 'In Transit',
      delivered: 'Delivered',
      failed: 'Failed',
      returned: 'Returned',
      active: 'Active',
      inactive: 'Inactive',
      maintenance: 'Maintenance',
      charging: 'Charging'
    }
  },
  zh: {
    common: {
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      create: '创建',
      update: '更新',
      search: '搜索',
      filter: '筛选',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息'
    },
    navigation: {
      home: '首页',
      dashboard: '仪表板',
      orders: '订单',
      fleet: '车队',
      reports: '报告',
      settings: '设置',
      profile: '个人资料',
      logout: '退出登录'
    },
    orders: {
      title: '订单',
      createOrder: '创建订单',
      orderId: '订单号',
      customer: '客户',
      status: '状态',
      mode: '配送方式',
      createdAt: '创建时间',
      actions: '操作',
      view: '查看',
      track: '跟踪',
      assign: '分配',
      cancel: '取消'
    },
    fleet: {
      title: '车队',
      asset: '资产',
      type: '类型',
      battery: '电池',
      status: '状态',
      lastSeen: '最后在线',
      actions: '操作',
      track: '跟踪',
      maintain: '维护'
    },
    status: {
      created: '已创建',
      dispatched: '已派送',
      inTransit: '运输中',
      delivered: '已送达',
      failed: '失败',
      returned: '已退回',
      active: '活跃',
      inactive: '非活跃',
      maintenance: '维护中',
      charging: '充电中'
    }
  },
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      create: 'Crear',
      update: 'Actualizar',
      search: 'Buscar',
      filter: 'Filtrar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      info: 'Información'
    },
    navigation: {
      home: 'Inicio',
      dashboard: 'Panel',
      orders: 'Pedidos',
      fleet: 'Flota',
      reports: 'Reportes',
      settings: 'Configuración',
      profile: 'Perfil',
      logout: 'Cerrar Sesión'
    },
    orders: {
      title: 'Pedidos',
      createOrder: 'Crear Pedido',
      orderId: 'ID del Pedido',
      customer: 'Cliente',
      status: 'Estado',
      mode: 'Modo de Entrega',
      createdAt: 'Creado En',
      actions: 'Acciones',
      view: 'Ver',
      track: 'Rastrear',
      assign: 'Asignar',
      cancel: 'Cancelar'
    },
    fleet: {
      title: 'Flota',
      asset: 'Activo',
      type: 'Tipo',
      battery: 'Batería',
      status: 'Estado',
      lastSeen: 'Última Vez',
      actions: 'Acciones',
      track: 'Rastrear',
      maintain: 'Mantener'
    },
    status: {
      created: 'Creado',
      dispatched: 'Despachado',
      inTransit: 'En Tránsito',
      delivered: 'Entregado',
      failed: 'Fallido',
      returned: 'Devuelto',
      active: 'Activo',
      inactive: 'Inactivo',
      maintenance: 'Mantenimiento',
      charging: 'Cargando'
    }
  },
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      update: 'Mettre à jour',
      search: 'Rechercher',
      filter: 'Filtrer',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      warning: 'Avertissement',
      info: 'Information'
    },
    navigation: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      orders: 'Commandes',
      fleet: 'Flotte',
      reports: 'Rapports',
      settings: 'Paramètres',
      profile: 'Profil',
      logout: 'Déconnexion'
    },
    orders: {
      title: 'Commandes',
      createOrder: 'Créer une Commande',
      orderId: 'ID de Commande',
      customer: 'Client',
      status: 'Statut',
      mode: 'Mode de Livraison',
      createdAt: 'Créé le',
      actions: 'Actions',
      view: 'Voir',
      track: 'Suivre',
      assign: 'Assigner',
      cancel: 'Annuler'
    },
    fleet: {
      title: 'Flotte',
      asset: 'Actif',
      type: 'Type',
      battery: 'Batterie',
      status: 'Statut',
      lastSeen: 'Dernière Vue',
      actions: 'Actions',
      track: 'Suivre',
      maintain: 'Maintenir'
    },
    status: {
      created: 'Créé',
      dispatched: 'Expédié',
      inTransit: 'En Transit',
      delivered: 'Livré',
      failed: 'Échoué',
      returned: 'Retourné',
      active: 'Actif',
      inactive: 'Inactif',
      maintenance: 'Maintenance',
      charging: 'Chargement'
    }
  },
  de: {
    common: {
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      update: 'Aktualisieren',
      search: 'Suchen',
      filter: 'Filtern',
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      warning: 'Warnung',
      info: 'Information'
    },
    navigation: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      orders: 'Bestellungen',
      fleet: 'Flotte',
      reports: 'Berichte',
      settings: 'Einstellungen',
      profile: 'Profil',
      logout: 'Abmelden'
    },
    orders: {
      title: 'Bestellungen',
      createOrder: 'Bestellung Erstellen',
      orderId: 'Bestell-ID',
      customer: 'Kunde',
      status: 'Status',
      mode: 'Liefermodus',
      createdAt: 'Erstellt am',
      actions: 'Aktionen',
      view: 'Anzeigen',
      track: 'Verfolgen',
      assign: 'Zuweisen',
      cancel: 'Stornieren'
    },
    fleet: {
      title: 'Flotte',
      asset: 'Asset',
      type: 'Typ',
      battery: 'Batterie',
      status: 'Status',
      lastSeen: 'Zuletzt Gesehen',
      actions: 'Aktionen',
      track: 'Verfolgen',
      maintain: 'Warten'
    },
    status: {
      created: 'Erstellt',
      dispatched: 'Versandt',
      inTransit: 'Unterwegs',
      delivered: 'Geliefert',
      failed: 'Fehlgeschlagen',
      returned: 'Zurückgegeben',
      active: 'Aktiv',
      inactive: 'Inaktiv',
      maintenance: 'Wartung',
      charging: 'Laden'
    }
  }
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale)
    }
  }, [])

  useEffect(() => {
    // Save locale to localStorage
    localStorage.setItem('locale', locale)
  }, [locale])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if translation not found
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

interface LanguageSelectorProps {
  className?: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { locale, setLocale } = useI18n()

  const languages = [
    { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as Locale, name: '中文', flag: '🇨🇳' },
    { code: 'es' as Locale, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Locale, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Locale, name: 'Deutsch', flag: '🇩🇪' }
  ]

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className || ''}`}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  )
}

export default I18nProvider
