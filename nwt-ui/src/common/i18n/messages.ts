import {ObjectKey} from "common/types/commonTypes";

export const messages = {
    common: {
        noSelection: (startPage: string) => `Es sind keine Daten geladen. Bitte auf ${startPage} klicken`,
        saveButton: 'Speichern',
        cancelButton: 'Abbruch',
        showDetailsButton: 'Details anzeigen'
    },
    crudActions: {
        edit: 'Ändern..',
        save: 'Speichern',
        delete: 'Löschen...',
        create: 'Neu...'
    },
    menu: {
        welcome: 'Übersicht',
        user: 'User',
        player: 'Spieler',
        cities: 'Städte',
        storages: 'Lager',
        favorites: 'Lesezeichen'
    },
    success: {
        updated: (name: string) => `${name} erfolgreich gespeichert`
    },
    errors: {
        itemNotFound: (id: ObjectKey | undefined) => `Item ${id} nicht gefunden`
    },
    confirmations: {
        areYouSure: 'Sind Sie sicher?',
        delete: (name: string) => `"${name}" endgültig auslöschen - das hat Konsequenzen und kann nicht mehr ungeschehen gemacht werden...`
    },
    table: {
        actions: 'Aktionen'
    },
    welcomePage: {
        appBarTitle: 'Willkommen zu den New World Tools',
        description: 'Hier werden alle Daten der New World Inhalte angezeigt, z.B. Spieler, Welten, Städte, Lager,...'
    },
    citiesTable: {
        world: 'Welt',
        city: 'Stadt',
        details: 'Details',
        noSelection: 'Bitte eine Stadt auswählen',
        addCity: 'Stadt hinzufügen',
        editCity: 'Stadt ändern',
        deleteCity: 'Stadt löschen'
    },
    cityDetails: {
        title: (name: string) => `Die Eigenschaften von ${name}`,
        name: 'Name',
        details: 'City Details'
    },
    cityEditor: {
        insert: {
            title: 'Neue Stadt anlegen',
            description: 'Geben Sie die Eigenschaften der Stadt ein'
        },
        edit: {
            title: 'Stadt ändern'
        },
        delete: {
            title: 'Stadt löschen'
        },
        fields: {
            name: 'Name',
            details: 'Details'
        }
    },
    itemEditor: {
        insert: {
            title: 'Neues Item anlegen',
            description: 'Geben Sie die Eigenschaften ein'
        },
        edit: {
            title: 'Iten ändern'
        },
        delete: {
            title: 'Iten löschen'
        },
        fields: {
            name: 'Name',
            quantity: 'Anzahl',
            details: 'Details'
        },
    },
    citiesItemsTable: {
        noSelection: 'Bitte ein Item auswählen',
        unknownCity: 'Unbekannte Stadt',
        world: 'Welt',
        city: 'Stadt',
        name: 'Name',
        category: 'Kategorie',
        quantity: 'Anzahl',
        lager: 'Lager',
        actions: {
            add: 'Item hinzufügen',
            delete: 'Löschen'
        },
    },
    "userDetails": {
        userActive: 'ist angemeldet',
        players: 'Spieler',
        playersCount: 'Anzahl Spieler',
        userNotActive: 'nicht angemeldet'
    }
}

export const noDataMessage = messages.common.noSelection(messages.menu.welcome)