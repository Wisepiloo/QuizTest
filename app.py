import csv, random
from flask import Flask, render_template

#cambia de lugar las respuestas 
def randomizador(lector_csv):
    for fila in lector_csv:
        num_respuestas = len(fila) - 1 
        for _ in range(11):
            random1 = random.randint(1, num_respuestas - 1)
            random2 = random.randint(1, num_respuestas - 1)
            if random1 != random2:
                # Intercambiar los elementos en las posiciones random1 y random2
                fila[random1], fila[random2] = fila[random2], fila[random1]
    return lector_csv

#lee el .csv
def leer_archivo(nombre_archivo):
    # Abrir el archivo CSV en modo lectura y convertirlo en una lista de listas
    with open(nombre_archivo, mode='r') as archivo_csv:
        lector_csv = list(csv.reader(archivo_csv))
        lector_csv = randomizador(lector_csv)
    return lector_csv

app = Flask(__name__)

@app.route("/")
@app.route("/quizBash")
def index():
    archivo_csv = leer_archivo('static/csv/bash.csv')
    return render_template("quiz.html", archivo_csv=archivo_csv, title="Quiz Bash")

@app.route("/quizCSS")
def quizCss():
    archivo_csv = leer_archivo('static/csv/css.csv')
    return render_template("quiz.html", archivo_csv=archivo_csv, title="Quiz CSS")

@app.route("/quizHTML")
def quizHTML():
    archivo_csv = leer_archivo('static/csv/html.csv')
    return render_template("quiz.html", archivo_csv=archivo_csv, title="Quiz HTML")

@app.route("/quizJS")
def quizJS():
    archivo_csv = leer_archivo('static/csv/js.csv')
    return render_template("quiz.html", archivo_csv=archivo_csv, title="Quiz JavaScript")

#se ejecuta en el puerto 5000, permite conexiones externas en la misma red.
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)