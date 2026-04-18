"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Baby,
  BedDouble,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { DepartureDates } from "@/lib/googleSheets";

const DAYS_LABELS: Record<string, string[]> = {
  es: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  fr: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
};

const MONTH_LABELS: Record<string, string[]> = {
  es: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
  fr: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function monthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

interface Room {
  adults: number;
  children: number;
}

interface BookingFormProps {
  locale: string;
  departureDates: DepartureDates;
}

export function BookingForm({ locale, departureDates }: BookingFormProps) {
  const t = useTranslations("bookingForm");
  const now = new Date();
  const [baseMonth, setBaseMonth] = useState(now.getMonth());
  const [baseYear, setBaseYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);

  const monthNames = MONTH_LABELS[locale] || MONTH_LABELS.es;
  const dayNames = DAYS_LABELS[locale] || DAYS_LABELS.es;

  const totalPeople = rooms.reduce((s, r) => s + r.adults + r.children, 0);
  const isFlexible = totalPeople > 4;

  const month2 = baseMonth === 11 ? 0 : baseMonth + 1;
  const year2 = baseMonth === 11 ? baseYear + 1 : baseYear;

  function prevMonth() {
    if (baseMonth === 0) { setBaseMonth(11); setBaseYear(baseYear - 1); }
    else setBaseMonth(baseMonth - 1);
  }

  function nextMonth() {
    if (baseMonth === 11) { setBaseMonth(0); setBaseYear(baseYear + 1); }
    else setBaseMonth(baseMonth + 1);
  }

  function addRoom() {
    if (rooms.length < 5) setRooms([...rooms, { adults: 2, children: 0 }]);
  }

  function removeRoom() {
    if (rooms.length > 1) setRooms(rooms.slice(0, -1));
  }

  function updateRoom(idx: number, field: "adults" | "children", val: number) {
    const updated = [...rooms];
    updated[idx] = { ...updated[idx], [field]: val };
    setRooms(updated);
  }

  function isFixedDate(year: number, month: number, day: number) {
    const key = monthKey(year, month);
    return departureDates[key] === day;
  }

  function isPast(year: number, month: number, day: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(year, month, day) < today;
  }

  function isAvailable(year: number, month: number, day: number) {
    if (isPast(year, month, day)) return false;
    if (isFlexible) return true; // 5+ people can choose any future date
    return isFixedDate(year, month, day); // 1-4 people: only fixed date
  }

  function isSelected(year: number, month: number, day: number) {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  }

  function handleDateClick(year: number, month: number, day: number) {
    if (isAvailable(year, month, day)) {
      setSelectedDate(new Date(year, month, day));
    }
  }

  function sendWhatsApp() {
    if (!selectedDate) return;
    const loc = locale === "es" ? "es-CO" : locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-US";
    const dateStr = selectedDate.toLocaleDateString(loc, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const totalAdults = rooms.reduce((s, r) => s + r.adults, 0);
    const totalChildren = rooms.reduce((s, r) => s + r.children, 0);

    let msg = t("whatsappIntro") + "\n\n";
    msg += `📅 ${t("departureDate")}: ${dateStr}\n`;
    msg += `🏨 ${t("rooms")}: ${rooms.length}\n`;
    msg += `👥 ${t("adults")}: ${totalAdults}\n`;
    if (totalChildren > 0) msg += `👶 ${t("children")}: ${totalChildren}\n`;
    msg += "\n" + t("whatsappOutro");

    window.open(
      `https://api.whatsapp.com/send/?phone=573002322335&text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  function renderCalendar(year: number, month: number) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div className="flex-1 min-w-[260px]">
        <h4 className="text-center font-bold text-white text-lg mb-3">
          {monthNames[month]} {year}
        </h4>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((d) => (
            <div key={d} className="text-center text-xs font-bold text-white/60 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} className="h-9" />;
            const past = isPast(year, month, day);
            const available = isAvailable(year, month, day);
            const selected = isSelected(year, month, day);
            const fixed = isFixedDate(year, month, day) && !past;

            return (
              <button
                key={day}
                onClick={() => handleDateClick(year, month, day)}
                disabled={!available}
                className={`
                  h-9 w-full rounded-lg text-sm font-medium transition-all duration-200 relative
                  ${selected
                    ? "bg-secondary text-primary font-bold shadow-lg scale-110 ring-2 ring-white/40"
                    : fixed && !isFlexible
                    ? "bg-white/25 text-white border-2 border-secondary/70 hover:bg-secondary/40 hover:scale-105 cursor-pointer font-bold"
                    : available
                    ? "bg-white/10 text-white/90 hover:bg-white/25 hover:scale-105 cursor-pointer border border-white/15"
                    : past
                    ? "text-white/15 cursor-default"
                    : "text-white/30 cursor-default"
                  }
                `}
              >
                {day}
                {fixed && !past && !selected && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-secondary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl overflow-hidden shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #071e3d 0%, #0a3566 40%, #1a4f8b 100%)",
      }}
    >
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-center py-5 px-4 cursor-pointer group transition-colors hover:bg-white/[0.04]"
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-white border-2 border-white/30 rounded-full px-6 py-2.5 backdrop-blur-sm group-hover:border-white/50 transition-colors"
        >
          <CalendarDays className="w-5 h-5" />
          {t("title")}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </motion.h3>
        {!isOpen && (
          <p className="text-white/40 text-xs mt-2">{t("fixedDateHint")}</p>
        )}
      </button>

      <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
      {isFlexible && (
        <p className="text-secondary text-sm font-medium text-center mb-4">
          ✨ {t("flexibleDates")}
        </p>
      )}
      <div className="px-4 md:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar */}
          <div className="flex-[2]">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
              {t("departureDate")}
            </p>
            <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {renderCalendar(baseYear, baseMonth)}
                {renderCalendar(year2, month2)}
              </div>
              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="flex-1 min-w-[250px]">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
              {t("guestsRooms")}
            </p>
            <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-5 border border-white/10 space-y-4">
              {/* Room count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <BedDouble className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold">{t("rooms")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={removeRoom} disabled={rooms.length <= 1}
                    className="w-8 h-8 rounded-full bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20 disabled:opacity-30 transition-colors">
                    −
                  </button>
                  <span className="text-white font-bold w-6 text-center">{rooms.length}</span>
                  <button onClick={addRoom} disabled={rooms.length >= 5}
                    className="w-8 h-8 rounded-full bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20 disabled:opacity-30 transition-colors">
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10" />

              <AnimatePresence>
                {rooms.map((room, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    {rooms.length > 1 && (
                      <p className="text-white/40 text-xs font-semibold uppercase">{t("room")} {i + 1}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-sm">{t("adults")}</span>
                      </div>
                      <select value={room.adults} onChange={(e) => updateRoom(i, "adults", Number(e.target.value))}
                        className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n} className="text-gray-800">{n}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/80">
                        <Baby className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-sm">{t("children")}</span>
                      </div>
                      <select value={room.children} onChange={(e) => updateRoom(i, "children", Number(e.target.value))}
                        className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer">
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n} className="text-gray-800">{n}</option>
                        ))}
                      </select>
                    </div>
                    {i < rooms.length - 1 && <div className="border-t border-white/10" />}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* CTA */}
              <button
                onClick={sendWhatsApp}
                disabled={!selectedDate}
                className={`w-full mt-4 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
                  ${selectedDate
                    ? "bg-secondary text-primary hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
              >
                <MessageCircle className="w-5 h-5" />
                {t("cta")}
              </button>
            </div>

            {/* Summary */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
              >
                <p className="text-white/40 text-xs uppercase font-semibold tracking-wider">{t("selectedDate")}</p>
                <p className="text-secondary font-bold text-lg mt-1">
                  {selectedDate.toLocaleDateString(
                    locale === "es" ? "es-CO" : locale === "de" ? "de-DE" : locale === "fr" ? "fr-FR" : "en-US",
                    { weekday: "short", day: "numeric", month: "long", year: "numeric" }
                  )}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  👥 {rooms.reduce((s, r) => s + r.adults, 0)} {t("adults")} · 👶{" "}
                  {rooms.reduce((s, r) => s + r.children, 0)} {t("children")} · 🏨{" "}
                  {rooms.length} {t("rooms")}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}
