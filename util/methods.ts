const methods = {
    notify: {
        /**
         * Notify whenever klipper responds to gcode response
         */
        gcode: "notify_gcode_response",
        subscription: "notify_status_update",
        throttling: "notify_cpu_throttled",
        statistic: "notify_proc_stat_update",
        changed: {
            history: "notify_history_changed",
            webcams: "notify_webcams_changed",
            filelist: "notify_filelist_changed",
        },
        sudo: "notify_sudo_alert",
        user: {
            created: "notify_user_created",
            deleted: "notify_user_deleted",
            loggedout: "notify_user_logged_out",
        },
        manager: {
            response: "notify_update_response",
            refreshed: "notify_update_refreshed",
        },
        klippy: {
            ready: "notify_klippy_ready",
            shutdown: "notify_klippy_shutdown",
            disconnect: "notify_klippy_disconnect",
        },
        announcement: {
            update: "notify_announcement_update",
            dismissed: "notify_announcement_dismissed",
            wake: "notify_announcement_wake",
        },
        spoolman: {
            set: "notify_active_spool_set",
            changed: "notify_spoolman_status_changed",
        },
    },
    server: {
        info: "server.info",
        config: "server.config",
        cached: {
            gcode: "server.gcode_store",
            temperature: "server.temperature_store",
        },
        rollover: "server.logs.rollover",
        restart: "server.restart",
        id: "server.connection.identify",
        websocketId: "server.websocket.id",
    },
    printer: {
        /** Printer information */
        info: "printer.info",

        /** Emergency stop the printer */
        stop: "printer.emergency_stop",

        /** Restart the printer */
        restart: "printer.restart",

        /** Printer Objects
         *
         *  See https://moonraker.readthedocs.io/en/stable/printer_objects/
         * */
        objects: {
            list: "printer.objects.list",
            query: "printer.objects.query",
            subscribe: "printer.objects.subscribe",
        },
        firmwareRestart: "printer.firmware_restart",
        endstops: "printer.query_endstops.status",
        gcode: {
            run: "printer.gcode.script",
            help: "printer.gcode.help",
        },
        job: {
            start: "printer.print.start",
            pause: "printer.print.pause",
            resume: "printer.print.resume",
            cancel: "printer.print.cancel",
        },
    },
    system: {
        /** Host information */
        info: "machine.system_info",

        /** Shutdown host */
        shutdown: "machine.shutdown",

        /** Restart host */
        restart: "machine.reboot",

        /** SystemD management*/
        service: {
            /** Restart systemd service*/
            restart: "machine.services.restart",
            /** Stop systemd service*/
            stop: "machine.services.stop",
            /** Start SystemD service*/
            start: "machine.services.start",
        },
        /** Moonraker statistics*/
        stats: "machine.proc_stats",
        sudo: {
            password: "machine.sudo.password",
            info: "machine.sudo.info",
        },
        peripherals: {
            usb: "machine.peripherals.usb",
            serial: "machine.peripherals.serial",
            video: "machine.peripherals.video",
            canbus: "machine.peripherals.canbus",
        },
    },
    files: {
        list: {
            files: "server.files.list",
            roots: "server.files.roots",
        },
        metadata: {
            scan: "server.files.metascan",
            get: "server.files.metadata",
            thumbnail: "server.files.thumbnails",
        },
        directory: {
            create: "server.files.post_directory",
            delete: "server.files.delete_directory",
            get: "server.files.get_directory",
        },
        files: {
            move: "server.files.move",
            copy: "server.files.copy",
            zip: "server.files.zip",
        },
    },
    auth: {
        login: "access.login",
        logout: "access.logout",
        user: {
            current: "access.get_user",
        },
        information: "access.info",
        list: "access.users.list",
        manage: {
            create: "access.post_user",
            delete: "access.delete_user",
            resetPassword: "access.user.password",
            refreshJWT: "acess.refreshJWT",
            oneshot: "access.oneshot_token",
            apikey: {
                get: "access.get_api_key",
                generate: "access.post_api_key",
            },
        },
    },
    database: {
        list: "server.database.list",
        item: {
            get: "server.database.get_item",
            create: "server.database.post_item",
            delete: "server.database.delete_item",
        },
        manage: {
            compact: "server.database.compact",
            backup: {
                backup: "server.database.post_backup",
                delete: "server.database.delete_backup",
                restore: "server.database.restore",
            },
        },
        debug: {
            //i think i should remove this, not sure though.
            list: "debug.database.list",
            get: "debug.database.get_item",
            create: "debug.database.post_item",
            delete: "debug.database.delete_item",
            fetchTable: "debug.database.table",
        },
    },
    job: {
        queue: {
            status: "server.job_queue.status",
            pause: "server.job_queue.pause",
            start: "server.job_queue.start",
            jump: "server.job_queue.jump",
        },
        manage: {
            create: "server.job_queue.post_job",
            delete: "server.job_queue.delete_job",
        },
        history: {
            getList: "server.history.list",
            totals: {
                get: "server.history.totals",
                reset: "server.history.reset_totals",
            },
            job: {
                get: "server.history.get_job",
                delete: "server.history.delete_job",
            },
        },
    },
    announcement: {
        list: "server.announcement.list",
        update: "server.announcement.update",
        dismiss: "server.announcement.dismiss",
        feeds: {
            get: "server.announcement.feeds",
            subscribe: "server.announcement.post_feed",
            remove: "server.announcement.delete_feed",
        },
    },
    webcam: {
        list: "server.webcams.list",
        individual: {
            get: "server.webcams.get_item",
            /**
             * While this does correlate to https://moonraker.readthedocs.io/en/latest/external_api/webcams/, I did not call it create like i did other things. This is because of the fact you can create/modify webcams.
             */
            post: "server.webcams.post_item",
            delete: "server.webcams.delete_item",
            test: "server.webcams.test",
        },
    },
    update: {
        moonraker: "machine.update.moonraker",
        klipper: "machine.update.klipper",
        status: {
            get: "machine.update.status",
            refresh: "machine.update.refresh",
        },
        recover: "machine.update.recover",
        rollback: "machine.update.rollback",
        upgrade: "machine.update.upgrade",
    },
    devices: {
        power: {
            list: "machine.device_power.devices",
            state: {
                get: "machine.device_power.get_device",
                set: "machine.device_power.post_device",
            },
            batch: {
                get: "machine.device_power.status",
                on: "machine.device_power.on",
                off: "machine.device_power.off",
            },
        },
        wled: {
            list: "machine.wled.strips",
            status: "machine.wled.status",
            on: "machine.wled.on",
            off: "machine.wled.off",
            toggle: "machine.wled.toggle",
            get: "machine.wled.get_strip",
            control: "machine.wled.post_strip",
        },
        sensor: {
            list: "server.sensors.list",
            info: "server.sensors.info",
            measurements: "server.sensors.measurements",
        },
        mqtt: {
            publish: "server.mqtt.publish",
            subscribe: "server.mqtt.subscribe",
        },
    },
    spoolman: {
        status: "server.spoolman.status",
        set: "server.spoolman.post_spool_id",
        get: "server.spoolman.get_spoolman_id",
        proxy: "server.spoolman.proxy",
    },
    estimate: {
        status: "server.analysis.status",
        estimate: "server.analysis.estimate",
        process: "server.analysis.process",
        DUMP: "server.analysis.dump_config",
    },
    //octoprint will not be added as of now, drax is currently only websocket. maybe in the future?
    td1: {
        get: "machine.td1.data",
        reset: "machine.td1.reboot",
    },
    extensions: {
        list: "server.extensions.list",
        call: "server.extensions.request",
        agent: {
            send: "connection.send_event",
            register: "connection.register_remote_method",
        },
    },
} as const;
export default methods;
